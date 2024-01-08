import socket from '$lib/socket';
import DialogStore from '$lib/stores/dialog';
import LightStore from '$lib/stores/light';

async function getLight(): Promise<void> {
  DialogStore.progress.set(true);
  try {
    const { data } = await socket.emitter('light.get', {});
    LightStore.lightInfo.set(data);
  } catch (error) {
    console.error(error);
  }
  DialogStore.progress.set(false);
}

async function updateLightStauts(status: boolean): Promise<void> {
  try {
    DialogStore.progress.set(true);
    await socket.emitter('light.status.update', {
      lightStatus: Number(status),
    });
    const message = status ? '식물등을 켰습니다.' : '식물등을 껐습니다.';
    DialogStore.alert(message, 'success');
  } catch (error) {
    console.error(error);
  }
}

async function updateLightSettings(lightSettings: Record<string, any>): Promise<void> {
  try {
    await socket.emitter('light.settings.update', lightSettings);
  } catch (error) {
    console.error(error);
  }
}

export {
  getLight,
  updateLightStauts,
  updateLightSettings,
}
