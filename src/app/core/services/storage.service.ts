import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private localStorage: Storage = localStorage;

  constructor() {
  }

  public putUserToLocalStorage(user: object): void {
    // this.localStorage.setItem('user', user.toString());
  }
}
