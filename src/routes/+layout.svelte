<script lang="ts">
  import '../app.css';
  import '$lib/socket';
  import '$lib/stores/comm';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import CommStore from '$lib/stores/comm';
  import { App } from 'konsta/svelte';
  import Toast from '$lib/components/toast.svelte';
  import Progress from '$lib/components/progress.svelte';
  import Confirm from '$lib/components/confirm.svelte';

  const { pages } = CommStore;

  $: CommStore.routeChecker($page);
  onMount(() => {

  });
</script>
<style lang="scss">
</style>
<App theme="ios" safeAreas>
  <slot/>
  <Toast/>
  <Progress/>
  <Confirm/>
</App>
