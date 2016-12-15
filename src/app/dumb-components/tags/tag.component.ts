/**
 * Created by baunov on 12/12/16.
 */
import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-tag-search',
  template: `
<a [routerLink]="['/tag', tag]" class="list-inline-item btn-link">#{{tag}}</a>
`,
  styles: []
})
export class TagSearchComponent {

  @Input() tag: string;

  constructor() { }
}
