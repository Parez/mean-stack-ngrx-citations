/**
 * Created by baunov on 12/12/16.
 */
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/take';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from './';
import * as citation from '../state-management/actions/citation.action';
import { Citation } from '../models/citation';


@Component({
  selector: 'bc-find-book-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-tag-search [suggestedTags]="suggestedTags$ | async" [isSearching]="loading$ | async" (search)="search($event)"></app-tag-search>
    <app-citation-list [citations]="citations$ | async"></app-citation-list>
  `
})
export class FindBookPageComponent {
  suggestedTags$: Observable<string>;
  citations$: Observable<Citation[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.suggestedTags$ = store.select(fromRoot.getSearchTags).take(1);
    this.citations$ = store.select(fromRoot.getSearchResults);
    this.loading$ = store.select(fromRoot.getSearchLoading);
  }

  search(query: string) {
    this.store.dispatch(new citation.SearchAction(query));
  }
}
