<script lang="ts">
	import { loading } from '$lib/stores/loading.svelte';
    import { fade } from 'svelte/transition';
</script>

<style>
    .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }

    .spinner {
        width: 50px;
        height: 50px;
        border: 5px solid transparent;
        border-top: 5px solid #fff;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>

{#if loading.isLoading}
    <div class="loading-overlay" transition:fade>
        <div class="spinner"></div>
    </div>
{/if}