import { io, Socket } from 'socket.io-client';
import config from '../config/config';
import DialogStore from '$lib/stores/dialog';
import UserStore from '$lib/stores/user';

class SocketClient {
  private socket: Socket;

  constructor() {
    this.socket = io(config.host, {
      transports: ['websocket'],
    });
    this.setupSocketListeners();
  }

  private setupSocketListeners(): void {
    this.socket.on('connect', async () => {
      console.info('Connected to Socket Server');
      await UserStore.authorization();
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from Socket Server');
      DialogStore.progress.set(true);
      DialogStore.alert('서버/통신 오류가 발생했습니다.', 'error', false);
    });

    this.socket.once('connect_error', () => {
      console.log('Disconnected from Socket Server');
      DialogStore.progress.set(true);
      DialogStore.alert('서버/통신 오류가 발생했습니다.', 'error', false);
    });

  }

  public async emitter(command: string, parameter: Record<string, any>): Promise<any> {
    return new Promise((resolve, reject) => {
      this.socket.emit(command, parameter, (response: any) => {
        if (response.result === 'success') resolve(response);
        else reject(response);
      });
    });
  }
}

export default new SocketClient();