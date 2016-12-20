/**
 * Created by baunov on 16/12/16.
 */
import * as citationList from "../actions/citation-list.action";
import {Action} from '@ngrx/store';
import {Citation} from '../../models/citation';
import * as CitationListActions from '../actions/citation-list.action';
import * as CitationActions from '../actions/citation.action';
import * as citRed from './citation.reducer';


export interface State {
  loading: boolean,
  loaded: boolean,
  citations: Citation[],
  error: Error
}

export const initialState: State = {
  loading: false,
  loaded: false,
  citations: [],
  error: null
};


export function reducer(state = initialState, action: Action): State {
  switch (action.type) {

    case CitationListActions.Types.LOAD_FEED:
    case CitationListActions.Types.LOAD_BY_USER:
      return Object.assign(initialState, state, {loading: true, loaded: false});


    case CitationListActions.Types.LOAD_FEED_SUCCESS:
    case CitationListActions.Types.LOAD_BY_USER_SUCCESS:
      return Object.assign(initialState, state, {
        loading: false,
        loaded: true,
        citations: action.payload
      });


    case CitationListActions.Types.LOAD_FEED_FAILURE:
    case CitationListActions.Types.LOAD_BY_USER_FAILURE:
      return Object.assign(initialState, state, {
        loading: false,
        loaded: false,
        error: action.payload
      });

    //delegate to citation reducer
    case CitationActions.Types.EDIT_SUCCESS:
    case CitationActions.Types.LIKE_SUCCESS:
    case CitationActions.Types.DISLIKE_SUCCESS:
      return Object.assign(initialState, state, {
        entities: state.citations.map( citation => {
          // Only call sub reducer if the incoming actions id matches
          if (citation._id === action.payload._id) {
            let citState:citRed.State = {citation, loading:false, loaded: true, error: null};
            return citRed.reducer(citState, action);
          }
          return citation;
        })
      });


    default: {
      return state;
    }
  }
}
