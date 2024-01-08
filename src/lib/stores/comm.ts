import { writable, type Writable, readable, type Readable, get } from 'svelte/store';
import { browser } from '$app/environment';
import DialogStore from '$lib/stores/dialog';
import { to } from '$lib/utils/route';

interface PageInterface {
  title: string
  needAuth: boolean
}

class CommStore {
  public connected: Writable<boolean>;
  public darkMode: Writable<number>;
  public pages: Readable<Record<string, PageInterface>>
  
  constructor() {
    this.connected = writable(false);
    this.darkMode = writable(0);
    this.pages = readable({
      '/': {
        title: '🏠',
        needAuth: true,
      },
      '/sign': {
        title: '🔐',
        needAuth: false,
      },
      '/cook': {
        title: '🥘',
        needAuth: true,
      },
      '/light': {
        title: '💡',
        needAuth: true,
      },
    });
    this.checkDarkMode();
  }

  public checkDarkMode(): void {
    if (browser) {
      let value: number = 0;
      const storageValue = window.localStorage.getItem('darkMode');
      if (storageValue == null) window.localStorage.setItem('darkMode', String(value));
      else value = Number(storageValue);
      this.darkMode.set(value)
      if (value === 1) document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    }
  }


  public toggleDarkMode(): void {
    if (browser) {
      const value: number = get(this.darkMode);
      window.localStorage.setItem('darkMode', String(value === 0 ? 1 : 0));
      this.darkMode.set(value === 0 ? 1 : 0);
      if (value === 0) document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    }
  }

  public routeChecker(page: Record<string, any>, userInfo: Record<string, string>) {
    if (browser) {
      const currentPage = get(this.pages)[page.route.id];
      if (currentPage == null) {
        DialogStore.alert('유효하지 않은 경로입니다.', 'error');
        to('/');
      } else if (currentPage.needAuth && userInfo == null) {
        to('/sign');
      } else if (!currentPage.needAuth && userInfo != null) {
        to('/');
      }
    }
  }
}

export default new CommStore();