import { subscribeToQuery, type UnsubscribeFn } from 'datocms-listen';

import { HoudiniClient, isBrowser, type ClientPlugin, DataSource } from '$houdini';

import { PUBLIC_DATOCMS_API_TOKEN } from '$env/static/public';

import { PREVIEW_MODE_COOKIE_NAME, type Preview } from '$lib/preview';

// This type is meant to store information about the usage of the Real-time
// Updates.
type RealTimeUpdatesApi = null | {
	// This field is used to store the function that must be called
	// to gracefully close the connection to Real-time Updates API.
	unsubscribeFunction: UnsubscribeFn;
};

const enablePreview = () => {
	if (isBrowser) {
		// See: https://developer.mozilla.org/en-US/docs/web/api/document/cookie#example_2_get_a_sample_cookie_named_test2
		const cookie = document.cookie
			?.split('; ')
			.find((row) => row.startsWith(`${PREVIEW_MODE_COOKIE_NAME}=`))
			?.split('=')[1];

		const isPreview = !!cookie;

		if (isPreview) {
			return true;
		}
	}
};

// A custom plugin for Houdini client is the way we enable the realtime updates
// API usage when preview of draft record is active.
const realTimeUpdatesApiPluginForPreviewMode: ClientPlugin = () => {
	let realTimeUpdatesApi: RealTimeUpdatesApi = null;

	return {
		async network(ctx, { resolve, next, initialValue, variablesChanged, marshalVariables }) {
			if (enablePreview()) {
				const preview = (await (ctx.fetch ?? fetch)('/preview').then((response) =>
					response.json()
				)) as Preview;

				if (preview.enabled) {
					const unsubscribeFunction = await subscribeToQuery({
						query: ctx.text,
						variables: ctx.variables,
						// Here we use a different token for preview mode, which is retrieved from the server
						// and is only available when the server recognizes the content of the preview cookie
						// as the correct signature. This signature is generated using the
						// PREVIEW_MODE_ENCRYPTION_SECRET which is known only to the server.
						token: preview.token,
						preview: true,
						fetcher: ctx.fetch,
						onUpdate: ({ response }) => {
							const { data } = response;

							resolve(ctx, {
								data: data ?? null,
								errors: [],
								fetching: false,
								partial: true,
								source: DataSource.Network,
								stale: false,
								variables: ctx.variables ?? {}
							});
						},
						onChannelError: (error) => {
							resolve(ctx, {
								data: null,
								errors: [error],
								fetching: false,
								partial: true,
								source: DataSource.Network,
								stale: false,
								variables: ctx.variables ?? {}
							});
						}
					});

					realTimeUpdatesApi = { unsubscribeFunction };

					// Do *not* call `next(ctx)` when using the realtime API
					return;
				}
			}

			// When preview mode is of, let's just move to the following Houdini
			// client plugin.
			next(ctx);
		},
		cleanup() {
			realTimeUpdatesApi?.unsubscribeFunction?.();
		}
	};
};

export default new HoudiniClient({
	url: 'https://graphql.datocms.com/',

	fetchParams() {
		return {
			headers: {
				Authorization: `Bearer ${PUBLIC_DATOCMS_API_TOKEN}`
			}
		};
	},

	plugins: [realTimeUpdatesApiPluginForPreviewMode]
});
