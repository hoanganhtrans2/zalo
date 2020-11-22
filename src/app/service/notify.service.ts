import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  readonly url = 'http://localhost:3000';
  socket: any;

  constructor() {
    console.log('run here');
    this.socket = io.io(this.url, { transports: ['websocket'] });
  }

  connectNotify(id) {
    this.socket.emit('connectnotify', { id: id });
  }

  sendNotifyInvitations(id: string, model: any) {
    this.socket.emit('userconnect', { id, model });
  }
  listenNotify() {
    return new Observable((observer) => {
      this.socket.on('notify', (obj) => {
        observer.next(obj);
      });
    });
  }
}
