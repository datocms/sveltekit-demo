/// <references types="houdini-svelte">

/** @type {import('houdini').ConfigFile} */
const config = {
	apiUrl: 'https://graphql.datocms.com',
	schemaPollHeaders: {
		Authorization(env) {
			return `Bearer ${env.PUBLIC_DATOCMS_API_TOKEN}`;
		}
	},
	plugins: {
		'houdini-svelte': {
			// This is the setting that gives the possibility to build
			// the preview feature: by declaring here a custom store for GraphQL queries,
			// Houdini inherits all the stores that are generated at build time.
			// 
			// Therefore, we can use the custom store to inject the desired behaviours:
			// subscribe to a GraphQL channel and update the store contents when new data
			// are pushed from the server.
			customStores: {
				query: '$lib/stores.QueryStoreWithPreviewSupport'
			}
		}
	},
	scalars: {
		MetaTagAttributes: {
			type: 'Record<string, string>'
		},
		Date: {
			type: 'string'
		},
		IntType: {
			type: 'number'
		},
		JsonField: {
			type: 'unkown'
		},
		ItemId: {
			type: 'string'
		},
		FloatType: {
			type: 'number'
		},
		UploadId: {
			type: 'string'
		}
	}
};

export default config;
