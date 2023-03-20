import { HomeContentStore } from '$houdini';

export const prerender = true;

export const load = async (event) => {
	const query = new HomeContentStore();

	const { data } = await query.fetch({ event });

	return { HomeContent: { data } };
};
