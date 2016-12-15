/**
 * Created by baunov on 15/12/16.
 */
import {Action} from "@ngrx/store";
import {LoginCredentials} from '../../models/loginCredentials';
import {RegisterCredentials} from '../../models/registerCredentials';
import {User} from '../../models/user';

export const ActionTypes = {
  SIGN_IN: "SIGN_IN",
  AUTH_SUCCESS: "AUTH_SUCCESS",
  AUTH_FAILURE: "AUTH_FAILURE",
  SIGN_OUT: "SIGN_OUT",
  SIGN_UP: "SIGN_UP",
  LOAD_USER: "LOAD_USER"
};


export const signIn = (creds:LoginCredentials):Action => ({
  type: ActionTypes.SIGN_IN,
  payload: creds
});

export const authSuccess = (user:User):Action => ({
  type: ActionTypes.SIGN_IN,
  payload: user
});

export const authFailure = (err:string):Action => ({
  type: ActionTypes.SIGN_IN,
  payload: err
});

export const signUp = (creds:RegisterCredentials):Action => ({
  type: ActionTypes.SIGN_UP,
  payload: creds
});


export const loadUser = ():Action => ({
  type: ActionTypes.LOAD_USER,
  payload:{}
});
