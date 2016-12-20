/**
 * Created by baunov on 15/12/16.
 */
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { UserService } from '../../services/user.service';
import {LoginCredentials} from '../../models/loginCredentials';
import {User} from '../../models/user';
import * as auth from '../actions/auth.actions';
import {RegisterCredentials} from '../../models/registerCredentials';


@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private userService: UserService) { }

  //once SIGN_IN action is fired, we call service's method to sign in user
  //then we take the returned User object
  //and fire SIGN_IN_SUCCESS action passing in logged in user data that came from the service
  @Effect() signIn$: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.SIGN_IN)
    .map((action: Action) => action.payload)
    .switchMap( (credentials: LoginCredentials) => this.userService.signIn(credentials))
    .map( (user:User) => {
      if(user) return new auth.AuthSuccessAction(user);
      return new auth.AuthFailureAction("No such user");
    }).catch( () => of(new auth.AuthFailureAction("Auth error")));

  @Effect() signUp$: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.SIGN_UP)
    .map((action: Action) => action.payload)
    .switchMap( (credentials: RegisterCredentials) => this.userService.signUp(credentials))
    .map( (user:User) => {
      if(user) return new auth.AuthSuccessAction(user);
      return new auth.AuthFailureAction("No such user");
    }).catch( () => of(new auth.AuthFailureAction("Auth error")));
}
