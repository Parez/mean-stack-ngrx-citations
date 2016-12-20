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
import * as CitationListActions from '../actions/citation-list.action';
import {CitationService} from '../../services/citation.service';
import {Citation} from '../../models/citation';
import {handleError} from '../../utils/error-handling';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private citationService: CitationService) { }

  //load feed for current user
  @Effect() loadFeed$: Observable<Action> = this.actions$
    .ofType(CitationListActions.Types.LOAD_FEED)
    .switchMap( () => this.citationService.getUserFeed()
      .map( (cits:Citation[]) => {
        if(cits) return new CitationListActions.LoadFeedSuccessAction(cits);
        return new CitationListActions.LoadFeedFailureAction(new Error("Can't load citations feed"));
      }).catch( (err:Error) => {
        handleError("Load citations feed", err);
        return of(new CitationListActions.LoadFeedFailureAction(err));
      })
    );

  @Effect() loadByUser$: Observable<Action> = this.actions$
    .ofType(CitationListActions.Types.LOAD_FEED)
    .map((action: Action) => action.payload)
    .switchMap( (userId: string) => this.citationService.getUserCitations(userId)
      .map( (cits:Citation[]) => {
        if(cits) return new CitationListActions.LoadByUserSuccessAction(cits);
        return new CitationListActions.LoadByUserFailureAction(new Error("Can't load user citations"));
      }).catch( (err:Error) => {
        handleError("Load user citations", err);
        return of(new CitationListActions.LoadByUserFailureAction(err));
      })
    );
}
