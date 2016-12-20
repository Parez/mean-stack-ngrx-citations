import {Component, Input} from '@angular/core';
import {Citation} from '../../models/citation';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-citation',
  template: `
<div class="card card-outline-secondary">
  <div class="card-header">
    <a [routerLink]="['/user', citation.publisher._id]" class="btn-link">{{citation.user.username}}</a>
  </div>

  <div class="card-block">  
  <h5 class="card-title m-0">
    {{citation.text | capitalizeFirstLetter}}
  </h5>
  <a href="#" class="btn-link card-text"><small class="text-muted">© {{citation.author}}</small></a>
  </div>
  
  <div *ngIf="citation.tags.length > 0" class="list-group list-group-item">
    <a *ngFor="let tag of citation.tags" [routerLink]="['/tag', tag]" class="list-inline-item btn-link">#{{tag}}</a>
  </div>
  
  <div class="card-footer">
    <div class="row">
      <span class="col-md-4">
        <small class="text-muted">Views: {{citation.views}}</small>
      </span>
      <span class="col-md-4">13</span>
      <span class="col-md-2">
        <i>{{citation.views}}</i>
      </span>
      
      <app-citation-rank 
        [rank]="citation.rank" 
        (ranked)="onRankCitation($event)">
      </app-citation-rank>
      
    </div>
  </div>

</div>`,
  styleUrls: ['./citation.component.css']
})
export class CitationComponent{

  @Input() citation: Citation;

  constructor(private store:Store) { }

  onRankCitation($event){
    //dispatch action
  }
}
