import { writable, type Writable } from 'svelte/store';
import socket from '$lib/socket';
import { browser } from '$app/environment';
import { DialogStore } from '$lib/stores/dialog';

interface UserInfoInterface {
  id: string
  name: string
}

class UserStoreClass {
  public userInfo: Writable<UserInfoInterface | null>; 
  
  constructor() {
    this.userInfo = writable(null);
  }

  public async authorization(): Promise<void> {
    if (browser) {
      DialogStore.progress.set(true);
      const token = window.localStorage.getItem('userToken');
      if (token) {
        try {
          const { data: { userInfo } } = await socket.emitter('users.token.verify', {
            token,
          });
          this.userInfo.set(userInfo);
          DialogStore.alert(`${userInfo.name}님 반갑습니다!`, 'success');
          DialogStore.progress.set(false);
        } catch (error) {
          console.error(error);
          DialogStore.alert('유효하지 않은 토큰입니다. 다시 로그인해주세요.', 'error');
          DialogStore.progress.set(false);
        }
      } else {
        this.userInfo.set(null);
        DialogStore.progress.set(false);
      }
    }
  }

  public async signin(id: string, password: string): Promise<void> {
    DialogStore.progress.set(true);
    try {
      const { data: { token } } = await socket.emitter('users.token.get', {
        id,
        password,
      });
      window.localStorage.setItem('userToken', token);
      await this.authorization();
    } catch (error) {
      console.error(error);
      DialogStore.alert('계정 정보를 확인해주세요.', 'error');
      DialogStore.progress.set(false);
    }
  }

  public async signout(): Promise<void> {
    DialogStore.progress.set(true);
    try {
      await socket.emitter('users.signout', {});
      window.localStorage.removeItem('userToken');
      DialogStore.alert('로그아웃 되었습니다.', 'success');
      await this.authorization();
    } catch (error) {
      console.error(error);
      DialogStore.progress.set(false);
    }
  }
}

const UserStore = new UserStoreClass;

export {
  type UserInfoInterface,
  UserStore,
};
