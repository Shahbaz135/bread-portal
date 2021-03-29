import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Observable, Subject } from 'rxjs';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  static readonly LOGGED_USER_KEY = 'brotchengold-portal';
  static loggedUser = null;

  private static logStatus = new Subject<boolean>();
  public static getLogStatus(): Observable<any> {
    return this.logStatus.asObservable();
  }

  static isLogged() {
    const loggedUser = StorageService.getItem(AuthService.LOGGED_USER_KEY);
    this.loggedUser = loggedUser;
    const isLogged = loggedUser && new Date(loggedUser.exp).getTime() > Math.round((new Date()).getTime() / 1000);
    if (!isLogged) {
      this.removeLoggedUser();
    }
    return isLogged;
  }

  static getLoggedUser() {
    return StorageService.getItem(AuthService.LOGGED_USER_KEY);
  }

  static getUserVerification() {
    return StorageService.getItem(`cduIsVerified`);
  }

  static setLoggedUser(token, permissions) {
    const userDetails = JSON.parse(atob(token.split('.')[1]));
    userDetails.tokenInfo = token;
    userDetails.permissions = permissions;
    StorageService.setItem(AuthService.LOGGED_USER_KEY, userDetails);
    this.logStatus.next(true);
  }

  static removeLoggedUser() {
    StorageService.removeItem(AuthService.LOGGED_USER_KEY);
    this.logStatus.next(false);
    return true;
  }

  static checkPermission(moduleName, action?): Boolean {
    const user = this.getLoggedUser();
    // If user not exist return false.
    if (!user || !user.permissions || !user.permissions.length) {
      return false;
    }

    const module = _.find(user.permissions, {title: moduleName});
    // If module not found in permissions return false.
    if (!module) {
      return false;
    }

    // If module and action is provided to check.
    if (moduleName && action) {
      const moduleAction = _.find(module.actions, {name: action});
      if (!moduleAction) {
        return false;
      }
      // return module.actions.include(action);
    }

    return true;
  }
}
