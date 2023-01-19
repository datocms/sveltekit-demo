import { type RequestHandler, json } from '@sveltejs/kit';

import {
	PREVIEW_MODE_ENCRYPTION_SECRET,
	DRAFT_ENABLED_DATOCMS_API_TOKEN
} from '$env/static/private';

import { previewModeEncryptionSecretHash, PREVIEW_MODE_COOKIE_NAME } from '$lib/preview';

export const GET = (async ({ cookies }) => {
	const cookie = cookies.get(PREVIEW_MODE_COOKIE_NAME);

	if (!cookie) {
		return json({ enabled: false });
	}

	const hash = await previewModeEncryptionSecretHash(PREVIEW_MODE_ENCRYPTION_SECRET);

	if (cookie === hash) {
		return json({
			enabled: true,
			token: DRAFT_ENABLED_DATOCMS_API_TOKEN
		});
	}

	return json({ enabled: false });
}) satisfies RequestHandler;
