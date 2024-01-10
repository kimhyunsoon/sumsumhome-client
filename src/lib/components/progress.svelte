<script lang="ts">
  import { Preloader } from 'konsta/svelte';
  import { DialogStore } from '$lib/stores/dialog';
  const { progress } = DialogStore;
</script>
<style lang="scss">
  .progress-wrap {
    width: 100vw;
    height: 100vh;
    background-color: rgba(255,255,255,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 40;
    &.hidden {
      display: none !important;
    }
  }
</style>
<div class="progress-wrap" class:hidden={$progress === false}>
  <Preloader/>
</div>