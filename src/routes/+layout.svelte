<script lang="ts">
  import '../app.css';
  import '$lib/socket';
  import '$lib/stores/comm';
  import { App } from 'konsta/svelte';
  import Toast from '$lib/components/toast.svelte';
</script>
<style lang="scss">
</style>
<App theme="ios" safeAreas>
  <slot />
  <Toast/>
</App>
