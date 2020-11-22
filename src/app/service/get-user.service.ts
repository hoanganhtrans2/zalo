import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { UserModel } from '../shared/model/user.model';

export interface User {
  userid: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class GetUserService {

  constructor(private http: HttpClient) { }

  async getUserInfo(userid:string): Promise<any> {
    return await this.http.get(`http://localhost:3000/api/user/${userid}`).toPromise();
  }
 
  async updateInfo(model : UserModel): Promise<any>{
    return await this.http.post<any>('http://localhost:3000/api/updateinfo',model).toPromise();
  }

  async register(model : UserModel): Promise<any>{
    return await this.http.post<any>('http://localhost:3000/api/register',model).toPromise();
  }
}
