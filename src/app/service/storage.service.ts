import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  get(key: string) {
    return localStorage.getItem(key) || '';
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  removeAll() {
    localStorage.clear();
  }
  setLoad(key: string, value: string) {
    localStorage.setItem(key, value);
  }
  getLoad(key: string) {
    return localStorage.getItem(key) || 'true';
  }
}
