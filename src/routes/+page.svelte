<script lang="ts">
  import {
    Page,
    BlockTitle,
    Link,
  } from 'konsta/svelte';
  import Header from '$lib/components/header.svelte';
  import LightCard from '$lib/components/lightCard.svelte';
  import CookCard from '$lib/components/cookCard.svelte';
  import Icon from '@iconify/svelte';
  let test = 'asddddf';
  test = 'ddd';
</script>
<style lang="scss">
</style>
<Page>
  <Header/>
  <div class="lg:grid lg:grid-cols-3">
    <LightCard/>
  </div>
  <!-- <BlockTitle large withBlock={false}>
    🍳 이번 주 요리
    <Link href="/cook">
      <Icon
        icon="mingcute:right-fill"
        width="24"
      />
    </Link>
  </BlockTitle>
  <div class="lg:grid lg:grid-cols-3">
    <CookCard test={test}/>
    <CookCard/>
    <CookCard/>
  </div> -->
</Page>