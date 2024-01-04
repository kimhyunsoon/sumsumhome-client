<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { beforeNavigate } from '$app/navigation';
  import { page } from '$app/stores';
  import CommStore from '$lib/stores/comm';
  import UserStore from '$lib/stores/user';
  import { App } from 'konsta/svelte';
  import Toast from '$lib/components/toast.svelte';
  import Progress from '$lib/components/progress.svelte';
  import Confirm from '$lib/components/confirm.svelte';

  const { pages } = CommStore;
  const { userInfo } = UserStore;

  $: CommStore.routeChecker($page, $userInfo);

</script>
<style lang="scss">
</style>
<App theme="ios" safeAreas>
  <slot/>
  <Toast/>
  <Progress/>
  <Confirm/>
</App>
