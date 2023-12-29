import { writable, type Writable, readable, type Readable, get } from "svelte/store";
import { browser } from '$app/environment';

interface PageInterface {
  title: string
  needAuth: boolean
}

class CommStore {
  public darkMode: Writable<boolean>;
  public pages: Readable<Record<string, PageInterface>>
  
  constructor() {
    this.darkMode = writable(false);
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
      let value: boolean = true;
      const storageValue = window.localStorage.getItem('darkMode');
      if (storageValue == null) window.localStorage.setItem('darkMode', String(value));
      else value = Boolean(storageValue);
      this.darkMode.set(value)
      if (value) document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    }
  }

  public toggleDarkMode(): void {
    if (browser) {
      const value: boolean = get(this.darkMode);
      window.localStorage.setItem('darkMode', String(!value));
      this.darkMode.set(!get(this.darkMode));
      if (!value) document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    }
  }
}

export default new CommStore();