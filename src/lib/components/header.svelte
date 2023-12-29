<script lang="ts">
  import {
    Navbar,
    NavbarBackLink,
  } from 'konsta/svelte';
  import Icon from '@iconify/svelte';
  import { page } from '$app/stores';
  import CommStore from '$lib/stores/comm';
  const { darkMode, pages } = CommStore;
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
  <button
    slot="right"
    class="icon-fab transition-all"
    on:click="{() => { CommStore.toggleDarkMode() }}"
    type="button"
  >
    <Icon
      icon="mingcute:{$darkMode ? 'sun-line' : 'moon-line'}"
      width="24"
    />
  </button>
</Navbar>