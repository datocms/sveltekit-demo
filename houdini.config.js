/// <references types="houdini-svelte">

/** @type {import('houdini').ConfigFile} */
const config = {
	watchSchema: {
		url: 'https://graphql.datocms.com/',

		headers(env) {
			return { Authorization: `Bearer ${env.PUBLIC_DATOCMS_API_TOKEN}` };
		}
	},
	plugins: {
		'houdini-svelte': {}
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
