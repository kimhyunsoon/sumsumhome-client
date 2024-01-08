import { writable, type Writable, get } from 'svelte/store';

interface LightInterface {
  lightStatus: boolean
  lightStatusTimes: Record<string, number>[]
  lightOnMaxDuration: number
  lightStatusRecentDate: string
}

class LightStore {
  public lightInfo: Writable<LightInterface | null>; 
  
  constructor() {
    this.lightInfo = writable(null);
  }

}

export default new LightStore();