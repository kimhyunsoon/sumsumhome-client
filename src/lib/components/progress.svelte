<script lang="ts">
  import { Preloader } from 'konsta/svelte';
  import DialogStore from '$lib/stores/dialog';
  const { progress } = DialogStore;
</script>
<style lang="scss">
  .progress-wrap {
    width: 100vw;
    heigt: 100vh;
    background-color: rgba(255,255,255,0.3);
    display: flex;
    align-items: cetner;
    justify-content: cetner;
    z-index: 9999;
    &.hidden {
      display: none !important;
    }
  }
</style>
<div class="progress-wrap" class:hidden={$progress === false}>
  <Preloader/>
</div>