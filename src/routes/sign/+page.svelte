<script lang="ts">
  import {
    Page,
    List,
    ListInput,
    Button,
  } from 'konsta/svelte';
  import Icon from '@iconify/svelte';
  import Header from '$lib/components/header.svelte';
  import UserStore from '$lib/stores/user';
  let id: string = '';
  let pw: string = '';
  let validation: boolean = false;
  function checkValidation({ id, pw }: Record<string, string>): void {
    if (id.length >= 3 && pw.length >= 3) validation = true;
    else validation = false;
  }
  $: checkValidation({ id, pw });
</script>

<style lang="scss">
.button-wrap {
  width: 100vw;
  position: fixed;
  bottom: 0px;
}
</style>

<Page>
  <Header/>
  <List strongIos insetIos>
    <ListInput
      placeholder="아이디"
      type="text"
      value={id}
      onInput={(e) => { id = e.target.value }}
    >
      <Icon icon="mingcute:user-edit-line" width="18" slot="media"/>
    </ListInput>

    <ListInput
      placeholder="비밀번호"
      type="password"
      value={pw}
      onInput={(e) => { pw = e.target.value }}
    >
      <Icon icon="mingcute:key-2-line" width="18" slot="media"/>
    </ListInput>
  </List>
  <div class="button-wrap p-4">
    <Button
      large
      disabled={!validation}
      onClick={async () => { await UserStore.authorization() }}
    >
      로그인
    </Button>
  </div>
</Page>