// See: https://github.com/sveltejs/language-tools/blob/master/docs/preprocessors/typescript.md#im-using-an-attributeevent-on-a-dom-element-and-it-throws-a-type-error
declare namespace svelteHTML {
	interface HTMLAttributes {
		fetchpriority?: string;
	}
}
