<script lang="ts">
  import { Toast, Button } from 'konsta/svelte';
  import Icon from '@iconify/svelte';
  import DialogStore from '$lib/stores/dialog';
  const { toast } = DialogStore;
</script>
<style lang="scss">
</style>
<Toast position="right" opened={$toast.show}>
  <div class="shrink">{ $toast.message }</div>
  {#if !$toast.autoClose}
    <Button
      slot="button"
      clear
      inline
      onClick={() => { toast.set({
        ...$toast,
        show: false,
      }) }}
    >
      <Icon icon="mingcute:close-fill" width="20" color="white"/>
    </Button>
  {/if}
</Toast>