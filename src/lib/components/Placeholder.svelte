<script lang="ts">
	import type * as CSS from 'csstype';

	export let base64: string | null | undefined = undefined;
	export let backgroundColor: string | null | undefined = undefined;
	export let objectFit: CSS.Properties['objectFit'];
	export let objectPosition: CSS.Properties['objectPosition'];
	export let showImage: boolean;
	export let fadeInDuration: number = 0;

	let transition = fadeInDuration > 0 ? `opacity ${fadeInDuration}ms` : undefined;
	let opacity = showImage ? 0 : 1;
</script>

<img
	role="presentation"
	aria-hidden="true"
	alt=""
	src={base64}
	style:backgroundColor
	style:objectFit
	style:objectPosition
	style:transition
	style:opacity
	style="position: absolute; left: -5%; top: -5%; width: 110%; height: 110%"
/>
