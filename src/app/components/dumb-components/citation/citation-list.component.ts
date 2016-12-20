import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Citation} from '../../../models/citation';

@Component({
  selector: 'app-citation-list',
  template: `
<div *ngIf="citations.length <= 0">No citations found</div>
<app-citation *ngFor="let cit of citations" [citation]="cit"></app-citation>
`,
  styles: []
})
export class CitationListComponent {

  @Input() citations: Citation[];

  constructor() { }
}
