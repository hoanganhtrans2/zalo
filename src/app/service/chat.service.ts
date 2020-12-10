import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  readonly url = 'http://localhost:3200';
  socket: any;

  constructor(private http: HttpClient) {
    this.socket = io.io(this.url, { transports: ['websocket'] });
  }

  async getListRoom(model: any): Promise<any> {
    return this.http
      .post<any>('http://localhost:3200/api/getRoom', model)
      .toPromise();
  }

  async getListRoomChat(model: any): Promise<any> {
    return this.http
      .post<any>('http://localhost:3200/api/getRoomChat', model)
      .toPromise();
  }
  async getMemberInRoom(model: any): Promise<any> {
    return this.http
      .post<any>('http://localhost:3200/api/getMemberInRoom', model)
      .toPromise();
  }

  async getMessageFromRoom(model: any): Promise<any> {
    return this.http
      .post<any>('http://localhost:3200/api/getMessageFromRoom', model)
      .toPromise();
  }
  async putMessage(model: any): Promise<any> {
    return this.http
      .post<any>('http://localhost:3200/api/putMessage', model)
      .toPromise();
  }
}
