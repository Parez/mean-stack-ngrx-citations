/**
 * Created by baunov on 15/12/16.
 */
import * as auth from "../actions/auth.actions";
import {Action} from '@ngrx/store';
import {LoginCredentials} from '../../models/loginCredentials';
import {User} from '../../models/user';
import {RegisterCredentials} from '../../models/registerCredentials';


export interface State {
  processing: boolean,
  loggedIn: boolean,
  token: string,
  user: User,
  error: string
}

export const initialState: State = {
  processing: false,
  loggedIn: false,
  token: "",
  user: null,
  error: ""
};


export function reducer(state = initialState, action: Action): State {
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
        loggedIn: false,
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
