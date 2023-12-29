<script lang="ts">
  import {
    Page,
    Navbar,
    Block,
    Button,
    List,
    ListItem,
    BlockTitle,
  } from 'konsta/svelte';
  import Header from '$lib/components/header.svelte';
  import DialogStore from '$lib/stores/dialog';
</script>

<Page>
  <Header/>
  <Block strong>
    <p>Here is your SvelteKit & Konsta UI app. Let's see what we have here.</p>
  </Block>
  <BlockTitle>Navigation</BlockTitle>
  <List>
    <ListItem href="/cook" title="Cook" />
    <ListItem href="/sign" title="Sign" />
  </List>

  <Block strong class="flex space-x-4">
    <Button onClick={() => { DialogStore.alert('test', false) }}>show</Button>
  </Block>
</Page>