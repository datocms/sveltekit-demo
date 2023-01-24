import { error, redirect, type RequestHandler } from '@sveltejs/kit';

const isDev = import.meta.env.DEV;

import { PREVIEW_MODE_PASSWORD, PREVIEW_MODE_ENCRYPTION_SECRET } from '$env/static/private';

import { previewModeEncryptionSecretHash, PREVIEW_MODE_COOKIE_NAME } from '$lib/preview';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const allParams = url.searchParams;

	// Please set the PREVIEW_MODE_PASSWORD env variable
	// on Vercel/Netlify, or everyone will be able to enter Preview Mode and
	// see draft content!

	// Check the secret
	if (allParams.get('secret') !== PREVIEW_MODE_PASSWORD) {
		throw error(401, 'Missing or invalid `secret` query string parameter!');
	}

	const hash = await previewModeEncryptionSecretHash(PREVIEW_MODE_ENCRYPTION_SECRET);

	cookies.set(PREVIEW_MODE_COOKIE_NAME, hash, {
		httpOnly: false,
		path: '/',
		sameSite: 'strict',
		secure: !isDev
	});

	const redirectParam = allParams.get('redirect');

	// Redirect to the homepage, or to the URL provided with the `redirect` query
	// string parameter:
	const redirectUrl = redirectParam ?? '/';

	throw redirect(302, redirectUrl);
};
