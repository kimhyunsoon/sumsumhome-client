<script lang="ts">
  import { Dialog, DialogButton } from 'konsta/svelte';
  import { DialogStore } from '$lib/stores/dialog';
  const { confirmStore } = DialogStore;
</script>
<style lang="scss">
</style>
<Dialog
  opened={ $confirmStore.show }
  onBackdropClick={() => { DialogStore.confirmClose() }}
>
  <svelte:fragment slot="title">{ $confirmStore.title }</svelte:fragment>
    { $confirmStore.context }
  <svelte:fragment slot="buttons">
    <DialogButton onClick={() => { DialogStore.confirmClose() }}>취소</DialogButton>
    <DialogButton strong onClick={async () => { await $confirmStore.callback() }}>
      { $confirmStore.btnText }
    </DialogButton>
  </svelte:fragment>
</Dialog>