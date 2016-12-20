/**
 * Created by baunov on 16/12/16.
 */
import {Action} from '@ngrx/store';
import {Citation} from '../../models/citation';
import * as CitationActions from '../actions/citation.action';


export interface State {
  loading: boolean,
  loaded: boolean,
  citation: Citation,
  error: Error
}

export const initialState: State = {
  loading: false,
  loaded: false,
  citation: null,
  error: null
};


export function reducer(state = initialState, action: Action): State {
  switch (action.type) {

    //Start loading actions
    case CitationActions.Types.LOAD:
    case CitationActions.Types.CREATE:
    case CitationActions.Types.DELETE:
    case CitationActions.Types.EDIT:
    case CitationActions.Types.LIKE:
    case CitationActions.Types.DISLIKE:
      return Object.assign(initialState, state, {
        loading: true,
        loaded: false
      });

    //Success actions
    case CitationActions.Types.LOAD_SUCCESS:
    case CitationActions.Types.CREATE_SUCCESS:
    case CitationActions.Types.EDIT_SUCCESS:
    case CitationActions.Types.LIKE_SUCCESS:
    case CitationActions.Types.DISLIKE_SUCCESS:
      return Object.assign(initialState, state, {
        citation: action.payload,
        loading: false,
        loaded: true
      });

    case CitationActions.Types.DELETE_SUCCESS:
      return Object.assign(initialState, state, {
        citation: null,
        loading: false,
        loaded: true
      });

    //Failure actions
    case CitationActions.Types.LOAD_FAILURE:
    case CitationActions.Types.CREATE_FAILURE:
    case CitationActions.Types.DELETE_FAILURE:
    case CitationActions.Types.EDIT_FAILURE:
    case CitationActions.Types.LIKE_FAILURE:
    case CitationActions.Types.DISLIKE_FAILURE:
      return Object.assign(initialState, state, {
        loading: false,
        loaded: false,
        error: action.payload
      });

    default: {
      return state;
    }
  }
}
