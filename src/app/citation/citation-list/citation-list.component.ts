import {Component, OnInit, Input} from '@angular/core';
import {Citation} from '../../models/citation';

@Component({
  selector: 'app-citation-list',
  templateUrl: './citation-list.component.html',
  styleUrls: ['./citation-list.component.css']
})
export class CitationListComponent implements OnInit {
  @Input() citations:Citation[];

  constructor() { }

  ngOnInit() {
  }

}
