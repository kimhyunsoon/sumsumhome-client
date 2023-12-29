import { writable, type Writable, readable, type Readable, get } from "svelte/store";
import socket from "$lib/socket";

interface UserInfoInterface {
  id: string
  name: string
}

class UserStore {
  public userInfo: Writable<UserInfoInterface | null>; 
  
  constructor() {
    this.userInfo = writable(null);
  }

  public async authorization(): Promise<void> {
    const token = window.localStorage.getItem('userToken');
    if (token) {
      try {
        const response = await socket.emitter('staff.token.get', {
          id: 'admin',
          password: 'admin!@',
        });
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    } else {
      this.userInfo.set(null);
    }
  }

  // public async signin(id: string, password: string): Promise<void> {
  //   try {
      
  //   } catch {

  //   }
  // }
}

export default new UserStore();