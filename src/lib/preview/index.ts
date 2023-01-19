export type EnabledPreview = {
	enabled: true;
	token: string;
};

export type DisabledPreview = {
	enabled: false;
};

export type Preview = EnabledPreview | DisabledPreview;

export const PREVIEW_MODE_COOKIE_NAME = '__datocms_preview_data';

export const previewModeEncryptionSecretHash = async (secret: string) => {
	const msgUint8 = new TextEncoder().encode(secret);
	const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

	return hashHex;
};

export const isEnabledPreview = (preview: Preview): preview is EnabledPreview => {
	return preview.enabled === true;
};
