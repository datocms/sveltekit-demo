import { HoudiniClient, type RequestHandler } from '$houdini';

import { PUBLIC_DATOCMS_API_TOKEN } from '$env/static/public';

const requestHandler: RequestHandler = async ({ fetch, text = '', variables = {} }) => {
	const url = 'https://graphql.datocms.com/';
	//           ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑
	// Make sure that GraphQL API URL declared here looks exactly the same as
	// the one the SvelteKit uses for storing hydrating data in HTML:
	// by inspecting a page rendered by SvelteKit, you'll find a tag like
	//
	// ```
	// <script type="application/json" data-sveltekit-fetched data-url="https://graphql.datocms.com/" data-hash="1n8hf6i">[...]</script>
	// ```
	//
	// `data-url` attribute must have the same exact value used in this file. Otherwise,
	// some useless API calls will be done at each page load.

	const result = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${PUBLIC_DATOCMS_API_TOKEN}`
		},
		body: JSON.stringify({
			query: text,
			variables
		})
	});

	return await result.json();
};

export default new HoudiniClient(requestHandler);
