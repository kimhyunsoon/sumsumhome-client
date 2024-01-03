<script lang="ts">
  import { Toast, Button } from 'konsta/svelte';
  import Icon from '@iconify/svelte';
  import DialogStore from '$lib/stores/dialog';
  const { toast } = DialogStore;
  const iconMap = {
    error: 'mingcute:alert-line',
    success: 'mingcute:check-fill',
    info: 'mingcute:information-line',
  }
</script>
<style lang="scss">
</style>
<Toast position="right" opened={$toast.show}>
  <div class="shrink flex items-center">
    <Icon icon="{ iconMap[$toast.type] }" class="mr-2" width="20" color="white"/>
    { $toast.message }
  </div>
  {#if !$toast.autoClose}
    <Button
      slot="button"
      clear
      inline
      onClick={() => { DialogStore.alertClose() }}
    >
      닫기
    </Button>
  {/if}
</Toast>