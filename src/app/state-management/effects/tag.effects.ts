/**
 * Created by baunov on 12/12/16.
 */
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { TagService } from '../../services/tag.service';
import * as tag from '../state-management/actions/tag.action';


/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application. StateUpdates is an observable of the latest state and
 * dispatched action. The `toPayload` helper function returns just
 * the payload of the currently dispatched action, useful in
 * instances where the current state is not necessary.
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

@Injectable()
export class BookEffects {
  constructor(private actions$: Actions, private tagService: TagService) { }


  @Effect() search$: Observable<Action> = this.actions$
    .ofType(tag.ActionTypes.SEARCH)
    .debounceTime(300)
    .map((action: tag.SearchAction) => action.payload)
    .switchMap(query => {
      if (query === '') {
        return empty();
      }

      const nextSearch$ = this.actions$.ofType(tag.ActionTypes.SEARCH).skip(1);

      return this.tagService.getSuggestedTags(query)
        .takeUntil(nextSearch$)
        .map(tags => new tag.SearchCompleteAction(tags))
        .catch(() => of(new tag.SearchCompleteAction([])));
    });
}
