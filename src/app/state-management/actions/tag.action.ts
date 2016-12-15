/**
 * Created by baunov on 12/12/16.
 */
import { Action } from '@ngrx/store';
import { type } from '../util';
import {Tag} from '../models/tag';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {
  SEARCH:           type('[Tag] Search'),
  SEARCH_COMPLETE:  type('[Tag] Search Complete'),
  LOAD:             type('[Tag] Load')
};


/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

//Action to find a tag by piece of text
export class SearchAction implements Action {
  type = ActionTypes.SEARCH;

  constructor(public payload: string) { }
}

export class SearchCompleteAction implements Action {
  type = ActionTypes.SEARCH_COMPLETE;

  constructor(public payload: Tag[]) { }
}

export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor(public payload: Tag) { }
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = SearchAction
  | SearchCompleteAction
  | LoadAction;
