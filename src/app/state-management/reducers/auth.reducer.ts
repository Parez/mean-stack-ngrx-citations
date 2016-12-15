/**
 * Created by baunov on 15/12/16.
 */
import {initialState, AuthState} from "../states/auth.state"
import * as auth from "../actions/auth.actions";
import {Action} from '@ngrx/store';
import {LoginCredentials} from '../../models/loginCredentials';
import {User} from '../../models/user';
import {RegisterCredentials} from '../../models/registerCredentials';

export function reducer(state = initialState, action: Action): AuthState {
  switch (action.type) {
    case auth.ActionTypes.SIGN_IN: {
      const creds:LoginCredentials = action.payload as LoginCredentials;

      if (creds.cred === "" || creds.pass === "") {
        return state;
      }

      return Object.assign({}, state, {
        processing: true,
        loggedIn: false
      });
    }

    case auth.ActionTypes.AUTH_SUCCESS: {
      const user:User = action.payload;

      return Object.assign({}, state, {
        processing: false,
        loggedIn: true,
        user: user
      });
    }

    case auth.ActionTypes.AUTH_FAILURE: {
      const err:string = action.payload;

      return Object.assign({}, state, {
        processing: false,
        loggedIn: true,
        user: null,
        error: err
      });
    }

    case auth.ActionTypes.SIGN_UP: {
      const creds:RegisterCredentials = action.payload as RegisterCredentials;

      if (creds.email === "" || creds.password === "" || creds.username === "") {
        return state;
      }

      return Object.assign({}, state, {
        processing: true,
        loggedIn: false
      });
    }

    default: {
      return state;
    }
  }
}
