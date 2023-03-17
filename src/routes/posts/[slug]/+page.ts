import type { RouteParams, PostContentVariables } from './$houdini';

export const prerender = true;

export const _PostContentVariables: PostContentVariables = ({
	params: { slug }
}: {
	params: RouteParams;
}) => ({ slug });
