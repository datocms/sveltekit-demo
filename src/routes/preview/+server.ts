import { type RequestHandler, json } from '@sveltejs/kit';

import { env } from '$env/dynamic/private';
import { PREVIEW_MODE_ENCRYPTION_SECRET } from '$env/static/private';

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
			token: env.DATOCMS_DRAFT_CONTENT_CDA_TOKEN
		});
	}

	return json({ enabled: false });
}) satisfies RequestHandler;
