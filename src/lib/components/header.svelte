<script lang="ts">
  import {
    Navbar,
    NavbarBackLink,
  } from 'konsta/svelte';
  import Icon from '@iconify/svelte';
  import { page } from '$app/stores';
  import CommStore from '$lib/stores/comm';
  import UserStore from '$lib/stores/user';
  const { darkMode, pages } = CommStore;
  const { userInfo } = UserStore;
</script>
<style lang="scss">
</style>
<Navbar
  title="{ $pages[String($page.route.id)].title }"
  large
  transparent
>
  <NavbarBackLink
    class="{ $page.route.id === '/' || $page.route.id === '/sign'? 'hidden' : '' }"
    slot="left"
    text=""
    onClick={() => history.back()}
  />
  <div slot="right" class="flex">
    {#if $userInfo !== null}
    <button
      class="icon-fab transition-all"
      on:click="{ async () => { await UserStore.signout() }}"
      type="button"
    >
      <Icon
        icon="mingcute:exit-line"
        width="24"
      />
    </button>
    {/if}
    <button
      class="icon-fab transition-all rotate-animation"
      on:click="{() => { CommStore.toggleDarkMode() }}"
      type="button"
    >
      <Icon
        icon="mingcute:{$darkMode ? 'sun-line' : 'moon-line'}"
        width="24"
      />
    </button>
  </div>
</Navbar>