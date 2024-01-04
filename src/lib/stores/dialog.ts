import { writable, type Writable, readable, type Readable, get } from "svelte/store";

interface ToastInterface {
  show: boolean
  message: string
  type: string
  autoClose: boolean
}

interface ConrimInterface {
  show: boolean
  title: string
  context: string
  btnText: string
  callback: Function
}

class DialogStore {
  public toast: Writable<ToastInterface>;
  public confirmStore: Writable<ConrimInterface>;
  public progress: Writable<boolean>;
  
  constructor() {
    this.toast = writable({
      show: false,
      message: '',
      type: 'info',
      autoClose: false,
    } as ToastInterface);

    this.confirmStore = writable({
      show: false,
      title: '',
      context: '',
      btnText: '확인',
      callback: async () => {},
    } as ConrimInterface);

    this.progress = writable(false);
  }

  public alert(message: string, type: string = 'info', autoClose: boolean = true): void {
    if (get(this.toast).show === true) this.alertClose();
    this.toast.set({
      show: true,
      message,
      type,
      autoClose,
    } as ToastInterface);
    if (autoClose) {
      setTimeout(() => {
        this.alertClose();
      }, 3000);
    }
  }

  public alertClose(): void {
    const before = get(this.toast);
    this.toast.set({
      ...before,
      show: false,
    } as ToastInterface);
  }

  public confirm({ title, context, btnText }: Record<string, string>, callback: Function): void {
    const btnTextValue = btnText == null ? '확인' : btnText;
    this.confirmStore.set({
      show: true,
      title,
      context,
      btnText: btnTextValue,
      callback,
    } as ConrimInterface);
  }

  public confirmClose(): void {
    const before = get(this.confirmStore);
    this.confirmStore.set({
      ...before,
      show: false,
    } as ConrimInterface);
  }

}

export default new DialogStore();