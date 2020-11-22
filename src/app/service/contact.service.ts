import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { UserModel } from '../shared/model/user.model';

export interface UserId {
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}

  async getListFriends(model: UserId): Promise<any> {
    return await this.http
      .post('http://localhost:3000/api/friend/getlistfriends', model)
      .toPromise();
  }

  async getListInvitations(model: UserId): Promise<any> {
    return await this.http
      .post('http://localhost:3000/api/friend/getListFriendsInvitations', model)
      .toPromise();
  }

  async acceptFriend(model: any): Promise<any> {
    return await this.http
      .post('http://localhost:3000/api/friend/acceptFriendRequest', model)
      .toPromise();
  }

  async denyFriend(model: any): Promise<any> {
    return await this.http
      .post('http://localhost:3000/api/friend/denyfriendrequest', model)
      .toPromise();
  }

  async findFriend(model: any): Promise<any> {
    return await this.http
      .post('http://localhost:3000/api/friend/finduser', model)
      .toPromise();
  }
  async deleteFriend(model: any): Promise<any> {
    return await this.http
      .post('http://localhost:3000/api/friend/deletefriend', model)
      .toPromise();
  }
  async sendFriendInvitions(model: any): Promise<any> {
    return await this.http
      .post('http://localhost:3000/api/friend/sendfriendinvitions', model)
      .toPromise();
  }
}
