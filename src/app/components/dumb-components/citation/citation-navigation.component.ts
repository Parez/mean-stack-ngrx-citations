import { Component, EventEmitter, Output } from '@angular/core';

const HISTORY_SIZE: number = 100;

@Component({
  selector: 'app-citation-navigation',
  template: `
<div class="btn-group btn-block">
  <button class="btn btn-primary col-md-6" [ngClass]="{'disabled': !hasPrev}" (click)="prev.emit($event)">
    <i class="fa fa-chevron-left" aria-hidden="false"></i></button>
  <button class="btn btn-primary col-md-6" (click)="next.emit($event)">
    <i class="fa fa-chevron-right" aria-hidden="false"></i></button>
</div>`
})
export class CitationNavigationComponent {

  @Output() next: EventEmitter<any> = new EventEmitter();
  @Output() prev: EventEmitter<any> = new EventEmitter();
  constructor() { }
}
