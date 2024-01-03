import { writable, type Writable, readable, type Readable, get } from "svelte/store";
import { browser } from '$app/environment';

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
        title: '홈',
        needAuth: true,
      },
      '/sign': {
        title: '로그인',
        needAuth: false,
      },
      '/cook': {
        title: '요리',
        needAuth: true,
      },
      'light': {
        title: '조명',
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

  public routeChecker(page: Record<string, any>) {
    if (browser) {
      console.log(page);

    }
  }
}

export default new CommStore();