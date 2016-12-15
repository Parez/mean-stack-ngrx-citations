/**
 * Created by baunov on 15/12/16.
 */
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { UserService } from '../../services/user.service';
import * as user from '../actions/auth.actions';
import {LoginCredentials} from '../../models/loginCredentials';
import {User} from '../../models/user';
import {authSuccess, authFailure} from '../actions/auth.actions';
import {RegisterCredentials} from '../../models/registerCredentials';


/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application. StateUpdates is an observable of the latest state and
 * dispatched action. The `toPayload` helper function returns just
 * the payload of the currently dispatched action, useful in
 * instances where the current state is not necessary.
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private userService: UserService) { }

  //once SIGN_IN action is fired, we call service's method to sign in user
  //then we take the returned User object
  //and fire SIGN_IN_SUCCESS action passing in logged in user data that came from the service
  @Effect() signIn$: Observable<Action> = this.actions$
    .ofType(user.ActionTypes.SIGN_IN)
    .map((action: Action) => action.payload)
    .switchMap( (credentials: LoginCredentials) => this.userService.signIn(credentials))
    .map( (user:User) => {
      if(user) return authSuccess(user);
      return authFailure("No such user");
    });

  @Effect() signUp$: Observable<Action> = this.actions$
    .ofType(user.ActionTypes.SIGN_UP)
    .map((action: Action) => action.payload)
    .switchMap( (credentials: RegisterCredentials) => this.userService.signUp(credentials))
    .map( (user:User) => {
      if(user) return authSuccess(user);
      return authFailure("No such user");
    });
}
