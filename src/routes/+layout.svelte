<script lang="ts">
	import Header from '$lib/components/Header/Header.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<Header />
{@render children()}
