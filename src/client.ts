import { HoudiniClient, type RequestHandler } from '$houdini';

import { PUBLIC_DATOCMS_API_TOKEN } from '$env/static/public';

const requestHandler: RequestHandler = async ({ fetch, text = '', variables = {}, metadata }) => {
	const url = 'https://graphql.datocms.com';
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
