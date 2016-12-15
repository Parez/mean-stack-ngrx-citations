import { Component, OnInit } from '@angular/core';
import {Citation} from '../../models/citation';
import {CitationService} from '../../services/citation.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-user-citations',
  templateUrl: './user-citations.component.html',
  styleUrls: ['./user-citations.component.css']
})
export class UserCitationsComponent implements OnInit {

  public userCitations:Citation[];
  constructor(private citationService:CitationService) { }

  ngOnInit() {
    this.citationService.getUserCitations(User.localUser._id).subscribe( (data:Citation[]) => {
      this.userCitations = data;
    }, (error) => {
      console.log(error);
    });
  }

}
