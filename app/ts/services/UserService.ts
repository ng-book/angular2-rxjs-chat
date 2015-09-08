/// <reference path="../../typings/app.d.ts" />
import {Injectable, bind} from "angular2/angular2";
import * as Rx from "rx";
import {User} from "models";

/**
 * UserService manages our current user
 */
@Injectable()
export class UserService {
  // `currentUser` contains the current user
  currentUser: Rx.Subject<User> = new Rx.BehaviorSubject<User>(null);

  public setCurrentUser(newUser: User): void {
    this.currentUser.onNext(newUser);
  }
}

export var userServiceInjectables: Array<any> = [
  bind(UserService).toClass(UserService)
];
