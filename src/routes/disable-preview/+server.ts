import { redirect, type RequestHandler } from '@sveltejs/kit';

import { PREVIEW_MODE_COOKIE_NAME } from '$lib/preview';

const isDev = import.meta.env.DEV;

export const GET: RequestHandler = async ({ cookies }) => {
	cookies.delete(PREVIEW_MODE_COOKIE_NAME, {
		httpOnly: false,
		path: '/',
		sameSite: 'strict',
		secure: !isDev
	});

	const redirectUrl = '/';

	throw redirect(302, redirectUrl);
};
