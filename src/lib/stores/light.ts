import { writable, type Writable } from 'svelte/store';

interface LightInterface {
  lightStatus: boolean
  lightStatusTimes: Record<string, number>[]
  lightOnMaxDuration: number
  lightStatusRecentDate: string
  temperature: string
  humidity: string
}

class LightStoreClass {
  public lightInfo: Writable<LightInterface | null>; 
  
  constructor() {
    this.lightInfo = writable(null);
  }

}

const LightStore = new LightStoreClass();

export {
  type LightInterface,
  LightStore,
};