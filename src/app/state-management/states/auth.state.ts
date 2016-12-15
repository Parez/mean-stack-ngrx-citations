/**
 * Created by baunov on 15/12/16.
 */
import {User} from '../../models/user';


export interface AuthState {
  processing: boolean,
  loggedIn: boolean,
  token: string,
  user: User,
  error: string
}

export const initialState: AuthState = {
  processing: false,
  loggedIn: false,
  token: "",
  user: null,
  error: ""
};


