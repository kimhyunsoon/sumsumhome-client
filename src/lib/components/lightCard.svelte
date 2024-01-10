
<script lang="ts">
  import { onMount } from 'svelte';
  import {
    BlockTitle,
    Card,
    Button,
    Link,
    Toggle,
    Chip,
    Preloader,
    Sheet,
    Segmented,
    SegmentedButton,
    Popover,
    List,
    ListItem,
  } from 'konsta/svelte';
  import Icon from '@iconify/svelte';

  import { getLight, updateLightStauts, updateLightSettings } from '$lib/socket/light';
  import {
    getDiffString,
    makeLocalString,
    getLightInfoToAfterString,
    makeLocalStatusTimes,
    makeUtcHour,
    secondsToTime,
    diffTimeToString,
  } from '$lib/utils/time';
  import { roundToDecimalNum } from '$lib/utils/comm';
  import { CommStore } from '$lib/stores/comm';
  import { DialogStore } from '$lib/stores/dialog';
  import { UserStore, type UserInterface } from '$lib/stores/user';
  import { LightStore } from '$lib/stores/light';
  const { darkMode } = CommStore;
  const { lightInfo } = LightStore;
  const { userInfo } = UserStore;

  let sheetOpened = false;
  let popoverOpened = false;
  const maxDurationsHours = [2, 4, 8, 12];

  async function updateLightStatusTimes(hour, value) {
    const lightStatusTimes = [...JSON.parse($lightInfo.lightStatusTimes)];
    lightStatusTimes[hour].value = value;
    await updateLightSettings({
      lightStatusTimes: JSON.stringify(lightStatusTimes),
    });
    lightInfo.set({
      ...$lightInfo,
      lightStatusTimes: JSON.stringify(lightStatusTimes),
    });
  }
  async function updateLightOnMaxDuration(hour) {
    await updateLightSettings({
      lightOnMaxDuration: hour * 60,
    });
    lightInfo.set({
      ...$lightInfo,
      lightOnMaxDuration: hour * 60,
    });
  }

  $: {
    if ($userInfo != null) getLight(); 
  }
</script>
<style lang="scss">
  .sheet-modal-block {
    background-color: #FEFAFF !important;
    &.dark {
      background-color: #1A1A1D !important;
    }
  }
</style>
<div>
  <BlockTitle large withBlock={false}>
    <button on:click="{async () => {
      await getLight();
      DialogStore.alert('식물등 정보를 다시 불러왔습니다.', 'success')
    }}">💡 식물등</button>
    <Link onClick={async () => {
      await getLight();
      document.querySelector('.sheet-wrap').scrollTo(0, 0);
      sheetOpened = true;
    }}>
      <Icon
        icon="mingcute:settings-6-line"
        width="24"
      />
    </Link>
  </BlockTitle>
  <Card>
    {#if $lightInfo != null}
    <BlockTitle withBlock={false} class="!pl-0 !mt-0 !pr-0">
      <div class="flex items-center">
        <Chip
          class="{ $lightInfo.lightStatus ? 'bg-yellow-400': '' }"
        >
          { $lightInfo.lightStatus ? '⚡️ 켜짐' : '꺼짐' }
        </Chip>
      </div>
      <Toggle
        small
        class="-my-1"
        checked={$lightInfo.lightStatus}
        onChange={async () => {
          await updateLightStauts(!$lightInfo.lightStatus);
          await getLight();
        }}
      />
    </BlockTitle>
    {#if $lightInfo.lightStatus}
    <div>
      <p class="text-base pt-4">
        {#if getDiffString('min', $lightInfo.lightStatusRecentDate).length <= 0}
          방금 켜졌어요.
        {:else}
          켜진지 { getDiffString('min', $lightInfo.lightStatusRecentDate) }되었어요.
        {/if}
      <p>
      <p class="text-gray-500">
        { getLightInfoToAfterString($lightInfo) }
      <p>
    </div>
    {:else}
    <div>
      <p class="text-base pt-4">{ makeLocalString($lightInfo.lightStatusRecentDate, 'M월 D일 H시 m분') }에 꺼졌어요.<p>
      <p class="text-gray-500">
        { getLightInfoToAfterString($lightInfo) }
      <p>
    </div>
    {/if}
    <div class="flex justify-between mt-5">
      <!-- 온도, 습도-->
      <p>🌡️ {roundToDecimalNum(Number($lightInfo.temperature))}℃ 💧 {roundToDecimalNum(Number($lightInfo.humidity))}%</p>
      <Link onClick={async () => {
        await getLight();
        document.querySelector('.sheet-wrap').scrollTo(0, 0);
        sheetOpened = true;
      }}>시간설정</Link>
    </div>
    <Sheet
      class="pb-safe w-screen"
      opened={sheetOpened}
      onBackdropClick={() => (sheetOpened = false)}
    >
      <div
        class="max-h-96 overflow-y-scroll !my-0 !p-8 sheet-modal-block {$darkMode ? 'dark' : ''} sheet-wrap"
      >
        <div class="mb-8 flex justify-between items-center">
          <div>
            <p class="text-base">최대 켜짐 시간</p>
            <p>
              <span>
                {diffTimeToString(secondsToTime($lightInfo.lightOnMaxDuration * 60))}
              </span>
              <span class="text-gray-500">동안 켜져 있으면 자동으로 꺼져요.</span></p>
          </div>
          <button
            class="icon-fab transition-all max-popover-button"
            on:click="{() => { popoverOpened = true }}"
            type="button"
          >
            <Icon
              icon="mingcute:settings-5-line"
              width="28"
            />
          </button>
        </div>
        <p class="text-base mb-2">시간설정</p>
        {#each makeLocalStatusTimes($lightInfo.lightStatusTimes) as row, hour}
        <div class="flex justify-between items-center mb-3">
          <div class="w-full shrink pr-4 flex items-end">
            <p class="text-sm text-right pb-1 mr-2">
              { hour < 12 ? '오전' : '오후' }
            </p>
            <p class="text-4xl text-right font-light">{hour}:00</p>
          </div>
          <Segmented strong class="!w-1/2 shrink-0">
            <SegmentedButton
              strong
              active={row.value === 1}
              onClick={async () => { await updateLightStatusTimes(makeUtcHour(hour), 1) }}
            >
              켜짐
            </SegmentedButton>
            <SegmentedButton
              strong
              active={row.value === 2}
              onClick={async () => { await updateLightStatusTimes(makeUtcHour(hour), 2) }}
            >
              없음
            </SegmentedButton>
            <SegmentedButton
              strong
              active={row.value === 0}
              onClick={async () => { await updateLightStatusTimes(makeUtcHour(hour), 0) }}
            >
              꺼짐
            </SegmentedButton>
          </Segmented>
        </div>
        {/each}
      </div>
    </Sheet>
    <Popover
      opened={popoverOpened}
      target=".max-popover-button"
      onBackdropClick={() => (popoverOpened = false)}
    >
      <List nested>
        {#each maxDurationsHours as hour}
        {#if hour * 60 !== $lightInfo.lightOnMaxDuration}
        <ListItem title={`${hour}시간`} link onClick={async () => {
          await updateLightOnMaxDuration(hour);
          popoverOpened = false;
        }} />
        {/if}
        {/each}
      </List>
    </Popover>
    {:else}
    <div class="flex justify-center w-100 py-8">
      <Preloader size="small"/>
    </div>
    {/if}
  </Card>
</div>