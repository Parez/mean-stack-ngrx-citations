/**
 * Created by baunov on 09/12/16.
 */
import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-citation-rank',
  template: `
<span>
  <span class="btn-group rank-pill col-md-4 pull-right">
    <button type="button" (click)="dislike.emit($event)" class="btn btn-secondary btn-sm btn-number">
      <span class="fa fa-minus"></span>
    </button>
    <button type="button" (click)="like.emit($event)" class="btn btn-secondary btn-sm btn-number">
      <span class="fa fa-plus"></span>
    </button>
  </span>
  <span class="col-md-1 pull-right">
    <strong>{{rank}}</strong>
  </span>
</span>`,
  styles: []
})
export class CitationRankComponent {

  @Input() rank: number;
  @Output() like = new EventEmitter<any>();
  @Output() dislike = new EventEmitter<any>();

  constructor() { }

  //TODO - Should load citations for the specified user via service
}
