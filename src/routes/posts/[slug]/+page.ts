import { PostContentStore } from '$houdini';

export const prerender = true;

export const load = async (event) => {
	const query = new PostContentStore();

	const { data } = await query.fetch({ event });

	return { PostContent: { data } };
};
