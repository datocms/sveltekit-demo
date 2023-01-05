<script lang="ts">
	import { parseISO, format } from 'date-fns';

	export let dateString: string;

	$: date = format(parseISO(dateString), 'LLLL	d, yyyy');
</script>

<time dateTime={dateString}>{date}</time>
