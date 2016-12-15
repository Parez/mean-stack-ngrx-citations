/**
 * Created by baunov on 12/12/16.
 */
import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-tag-search',
  template: `
<tag-input 
(onAdd)="tagAdded.emit($event)" 
(onRemove)="tagRemoved.emit($event)" 
(onTextChange)="tagSearch.emit($event)"
[autocompleteItems]="suggestedTags"
[autocomplete]="true"
[separatorKeys]="[32]"
[maxItems]="3"></tag-input>
`,
  styles: [`
.stylish-input-group .input-group-addon{
    background: white !important; 
}
.stylish-input-group .form-control{
	border-right:0; 
	box-shadow:0 0 0; 
	border-color:#ccc;
}
.stylish-input-group button{
    border:0;
    background:transparent;
}`]
})

//First search for tags using input
export class TagSearchComponent {

  @Input() suggestedTags: string[];
  @Input() isSearching: boolean;
  @Output() tagSearch = new EventEmitter<string>();
  @Output() tagAdded = new EventEmitter<string>();
  @Output() tagRemoved = new EventEmitter<string>();

  constructor() { }
}
