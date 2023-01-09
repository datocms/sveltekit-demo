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
