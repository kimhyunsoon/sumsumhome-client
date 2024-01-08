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
  const { darkMode } = CommStore;
  const currentPage = $pages[$page.route.id];

  $: CommStore.routeChecker($page, $userInfo);
</script>
<style lang="scss">
  .page-block {
    z-index: 30;
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
  }
</style>
<App theme="ios" safeAreas>
  <slot/>
  <Toast/>
  <Progress/>
  <Confirm/>
</App>
