import type { Readable } from 'svelte/store';

// ´QueryStore´ is imported from runtime folder to avoid a circular dependency issue.
// See: https://github.com/HoudiniGraphql/houdini/issues/818#issuecomment-1382295422
import { isBrowser, QueryStore } from '$houdini/plugins/houdini-svelte/runtime';
import type { GraphQLObject, QueryArtifact, QueryResult } from '$houdini/runtime/lib/types';
import {
	type StoreConfig,
	fetchParams
} from '$houdini/plugins/houdini-svelte/runtime/stores/query';

import {
	subscribeToQuery,
	type ChannelErrorData,
	type ConnectionStatus,
	type UnsubscribeFn
} from 'datocms-listen';

import { Preview, PREVIEW_MODE_COOKIE_NAME } from '$lib/preview';

// This type is meant to store information about
// the usage of the Real-time Updates.
type RealTimeUpdatesApi = null | {
	// This field is used to store the function that must be called
	// to gracefully close the connection to Real-time Updates API.
	unsubscribeFunction: UnsubscribeFn;
};

// This is the query store that is used as parent for all the query stores
// that Houdini creates when it finds GraphQL queries. This is done by using
// the `customStores` setting in `houdini.config.js` file.
//
// The behaviour of this store is the same as the one it inherit from
// (the original Houdini `QueryStore` class), but it handles subscriptions
// to DatoCMS' Real-time Updates API.
export class QueryStoreWithPreviewSupport<
	_Data extends GraphQLObject,
	_Input extends object,
	_ExtraFields = { error: ChannelErrorData; connectionStatus: ConnectionStatus }
> extends QueryStore<_Data, _Input, _ExtraFields> {
	enablePreview = false;

	realTimeUpdatesApi: RealTimeUpdatesApi = null;

	fetchFunction: typeof window.fetch | null = null;

	constructor({ artifact, storeName, variables }: StoreConfig<_Data, _Input, QueryArtifact>) {
		super({
			artifact,
			storeName,
			variables
		});

		this.store.update((storeState) => ({
			...storeState,
			connectionStatus: 'closed',
			error: null
		}));

		if (isBrowser) {
			// See: https://developer.mozilla.org/en-US/docs/web/api/document/cookie#example_2_get_a_sample_cookie_named_test2
			const cookie = document.cookie
				?.split('; ')
				.find((row) => row.startsWith(`${PREVIEW_MODE_COOKIE_NAME}=`))
				?.split('=')[1];

			const isPreview = !!cookie;

			if (isPreview) {
				this.enablePreview = true;
			}
		}
	}

	async fetch(...args: Parameters<QueryStore<_Data, _Input, _ExtraFields>['fetch']>) {
		// Here, the `fetch` function which is used at the first fetch is stored
		// as an attribute of the instance. The goal is to pass it later as a fetcher when subscribing to
		// the GraphQL subscription channel.
		const { context } = await fetchParams(this.artifact, this.storeName, { ...args[0] });
		const { fetch } = context;

		this.fetchFunction = fetch;

		return super.fetch(...args);
	}

	// The new behaviour of the store is introduced overriding the `subscribe` method:
	// the new one will normally call the one in the parent class, unless some conditions are met.
	// If that's the case, a request to subscribe to Real-time Updates API is triggered.
	subscribe(
		...args: Parameters<Readable<QueryResult<_Data, _Input, _ExtraFields>>['subscribe']>
	): () => void {
		// If code is running in the browser, and preview mode is enabled...
		if (isBrowser && this.enablePreview) {
			// ...we call `subscribe` method of the parent class and we store
			// the unsubscribe function for further usage.
			const unsubscribe = super.subscribe(...args);

			// Then subscribe to Real-time Update API.
			this.subscribeToRealTimeUpdateAPI();

			// Finally, we return a new unsubscribe function that, when called, ...
			return () => {
				// First, calls the unsubscribe function returned by the parent class.
				unsubscribe();

				// Then, only if the number of subscribers dropped to 0,
				// we call the function that stops listening to Real-time Update API.
				if (this.subscriberCount <= 0) {
					this.unsubscribeFronRealTimeUpdateAPI();
				}
			};
		} else {
			return super.subscribe(...args);
		}
	}

	private subscribeToRealTimeUpdateAPI() {
		if (!this.realTimeUpdatesApi) {
			this.store.update((storeState) => ({
				...storeState,
				connectionStatus: 'connecting'
			}));

			(async () => {
				const preview = (await (this.fetchFunction ?? fetch)('/preview').then((response) =>
					response.json()
				)) as Preview;

				if (preview.enabled) {
					const unsubscribeFunction = await subscribeToQuery({
						query: this.artifact.raw,
						variables: this.lastVariables,
						// Here we use a different token,
						// which is retrieved from the server and it's available
						// only when the server recognize the content of preview cookie
						// as the correct signature for the PREVIEW_MODE_ENCRYPTION_SECRET
						// that only the server knows.
						token: preview.token,
						preview: true,
						fetcher: this.fetchFunction ?? fetch,
						onStatusChange: (status) => {
							// This function is called multiple times during the lifecycle of
							// a subscription: `status` is expected to be `connecting` at first,
							// the becoming `connected` once the connection to the channel has been
							// espablished. Finally, when connction is closed, `status`	becomes `closed`.
							this.store.update((storeState) => ({
								...storeState,
								connectionStatus: status
							}));
						},
						onUpdate: (update) => {
							// This is the main callback that updates store data when new data
							// are pushed on the channel from the GraphQL server.
							this.store.update((storeState) => ({
								...storeState,
								data: update.response.data,
								error: null
							}));
						},
						onChannelError: (error) => {
							// In case of issues on the channel, we set data to `null`
							// and make the error available for inspection.
							this.store.update((storeState) => ({
								...storeState,
								data: null,
								error: error
							}));
						}
					});

					this.realTimeUpdatesApi = {
						unsubscribeFunction
					};
				}
			})();
		}
	}

	private unsubscribeFronRealTimeUpdateAPI() {
		if (this.realTimeUpdatesApi) {
			this.realTimeUpdatesApi.unsubscribeFunction();
			this.realTimeUpdatesApi = null;
		}
	}
}
