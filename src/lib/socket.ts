import { io, Socket } from 'socket.io-client';
import config from '../config/config';

class SocketClient {
  private socket: Socket;

  constructor() {
    this.socket = io(config.host, {
      transports: ['websocket'],
    });
    this.setupSocketListeners();
  }

  private setupSocketListeners(): void {
    this.socket.on('connect', () => {
      console.log('Connected to Socket Server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from Socket Server');
    });

    // Add more event listeners as needed
  }

  public async emitter(command: string, parameter: Record<string, any>): Promise<any> {
    return new Promise((resolve, reject) => {
      this.socket.emit(command, parameter, (response: any) => {
        if (response.result === 'success') resolve(response);
        else reject(response);
      });
    });
  }

  // Add more methods as needed
}

export default new SocketClient();