<script lang="ts">
  import {
    Link,
    Card,
    BlockTitle,
    Chip,
  } from 'konsta/svelte';

  import Icon from '@iconify/svelte';
  export let test: string;
</script>
<style lang="scss">
</style>
<Card>
  <!-- <div
    slot="header"
    class="ios:-mx-4 ios:-mt-4 h-48 p-4 flex items-end text-white ios:font-bold bg-cover bg-center"
    style="background-image: url(https://recipe1.ezmember.co.kr/cache/recipe/2021/12/08/70cd8583f83e05b529baaf65614669a61.jpg)"
  >
  </div> -->
  <span>{test}</span>
  <p class="text-midium mb-2 text-gray-500">1월 둘째주 목요일</p>
  <BlockTitle withBlock={false} class="!pl-0 !mt-0 text-xl mb-3">토마토 스튜</BlockTitle>
  <div>
    <Chip outline class="m-0.5 ml-0">
      소고기 <span class="text-2xs ml-1">500g</span>
    </Chip>
    <Chip outline class="m-0.5 ml-0">
      홀토마토<span class="text-2xs ml-1">1캔</span>
    </Chip>
    <Chip outline class="m-0.5 ml-0">
      소고기 <span class="text-2xs ml-1">500g</span>
    </Chip>
    <Chip outline class="m-0.5 ml-0">
      홀토마토<span class="text-2xs ml-1">1캔</span>
    </Chip>
    <Chip outline class="m-0.5 ml-0">
      소고기 <span class="text-2xs ml-1">500g</span>
    </Chip>
    <Chip outline class="m-0.5 ml-0">
      홀토마토<span class="text-2xs ml-1">1캔</span>
    </Chip>
  </div>
  <div class="flex justify-between mt-5">
    <Link></Link>
    <Link>상세보기</Link>
  </div>
</Card>
