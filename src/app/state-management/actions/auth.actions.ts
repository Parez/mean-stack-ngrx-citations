/**
 * Created by baunov on 15/12/16.
 */
import {Action} from "@ngrx/store";
import {LoginCredentials} from '../../models/loginCredentials';
import {RegisterCredentials} from '../../models/registerCredentials';
import {User} from '../../models/user';

export const ActionTypes = {
  SIGN_IN: "[AUTH] SIGN_IN",
  AUTH_SUCCESS: "[AUTH] AUTH_SUCCESS",
  AUTH_FAILURE: "[AUTH] AUTH_FAILURE",
  SIGN_OUT: "[AUTH] SIGN_OUT",
  SIGN_UP: "[AUTH] SIGN_UP",
  LOAD_USER: "[AUTH] LOAD_USER"
};


export class SignInAction implements Action {
  type = ActionTypes.SIGN_IN;
  constructor (public payload:LoginCredentials){}
}

export class AuthSuccessAction implements Action {
  type = ActionTypes.AUTH_SUCCESS;
  constructor (public payload:User){}
}

export class AuthFailureAction implements Action {
  type = ActionTypes.AUTH_FAILURE;
  //string containing error message
  constructor (public payload:string){}
}

export class SignUpAction implements Action {
  type = ActionTypes.SIGN_UP;
  constructor (public payload:RegisterCredentials){}
}

export class SignOutAction implements Action {
  type = ActionTypes.SIGN_OUT;
  constructor (){}
}

export class LoadUserAction implements Action {
  type = ActionTypes.LOAD_USER;
  constructor (){}
}

export type Actions
  = SignInAction
  | AuthSuccessAction
  | AuthFailureAction
  | SignUpAction
  | LoadUserAction
  | SignOutAction;

