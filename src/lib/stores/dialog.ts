import { writable, type Writable, readable, type Readable, get } from "svelte/store";

interface ToastInterface {
  show: boolean
  message: string
  type: string
  autoClose: boolean
}

class DialogStore {
  public toast: Writable<ToastInterface>; 
  
  constructor() {
    this.toast = writable({
      show: false,
      message: '',
      type: 'info',
      autoClose: false,
    } as ToastInterface);
  }

  public alert(message: string, type: string = 'info', autoClose: boolean = true): void {
    this.toast.set({
      show: true,
      message,
      type,
      autoClose,
    } as ToastInterface);
    if (autoClose) {
      setTimeout(() => {
        this.toast.set({
          ...get(this.toast),
          show: false,
        } as ToastInterface);
      }, 3000);
    }
  }

}

export default new DialogStore();