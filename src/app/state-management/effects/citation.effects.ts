/**
 * Created by baunov on 15/12/16.
 */
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import {Action} from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import * as CitationActions from '../actions/citation.action';
import {CitationService} from '../../services/citation.service';
import {Citation} from '../../models/citation';
import {handleError} from '../../utils/error-handling';

@Injectable()
export class CitationEffects {
  constructor(private actions$: Actions, private citationService: CitationService) { }

  //load citation by id
  @Effect() load$: Observable<Action> = this.actions$
    .ofType(CitationActions.Types.LOAD)
    .map((action: Action) => action.payload)
    .switchMap( (id: string) => this.citationService.getCitationById(id)
      .map( (cit:Citation) => {
        if(cit) return new CitationActions.LoadSuccessAction(cit);
        return new CitationActions.LoadFailureAction(new Error("Can't load citation"));
      }).catch( (err:Error) => {
        handleError("Load citation", err);
        return of(new CitationActions.LoadFailureAction(err));
      })
    );

  //when user creates citation
  @Effect() create$: Observable<Action> = this.actions$
    .ofType(CitationActions.Types.CREATE)
    .map((action: Action) => action.payload as Citation)
    .switchMap( (citData: Citation) => this.citationService.addCitation(citData)
      .map( (cit:Citation) => {
        if(cit) return new CitationActions.CreateSuccessAction(cit);
        return new CitationActions.CreateFailureAction(new Error("Can't create citation"));
      }).catch( (err:Error) => {
        handleError("Create citation", err);
        return of(new CitationActions.CreateFailureAction(err));
      }
    ));

  //when user deletes citation
  @Effect() delete$: Observable<Action> = this.actions$
    .ofType(CitationActions.Types.DELETE)
    .map((action: Action) => action.payload)
    .switchMap( (id: string) => this.citationService.deleteCitation(id)
      .map( (cit:Citation) => {
        if (cit) return new CitationActions.DeleteSuccessAction(cit);
        return new CitationActions.DeleteFailureAction(new Error("Can't delete citation"));
      }).catch( (err:Error) => {
        handleError("Delete citation", err);
        return of(new CitationActions.DeleteFailureAction(err));
      })
    );

  //when user likes citation
  @Effect() like$: Observable<Action> = this.actions$
    .ofType(CitationActions.Types.LIKE)
    .map((action: Action) => action.payload)
    .switchMap( (id: string) => this.citationService.likeCitation(id)
      .map( (cit:Citation) => {
        if(cit) return new CitationActions.LikeSuccessAction(cit);
        return new CitationActions.LikeFailureAction(new Error("Can't like citation"));
      }).catch( (err:Error) => {
        handleError("Like citation", err);
        return of(new CitationActions.LikeFailureAction(err));
      })
    );

  //when user dislikes citation
  @Effect() dislike$: Observable<Action> = this.actions$
    .ofType(CitationActions.Types.LIKE)
    .map((action: Action) => action.payload)
    .switchMap( (id: string) => this.citationService.dislikeCitation(id)
      .map( (cit:Citation) => {
        if(cit) return new CitationActions.DislikeSuccessAction(cit);
        return new CitationActions.DislikeFailureAction(new Error("Can't dislike citation"));
      }).catch( (err:Error) => {
        handleError("Dislike citation", err);
        return of(new CitationActions.DislikeFailureAction(err));
      })
    );


  //TODO update

}
