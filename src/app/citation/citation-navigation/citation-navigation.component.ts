import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import {Citation} from "../../models/citation";
import {CitationService} from "../../services/citation.service";

const HISTORY_SIZE: number = 100;

@Component({
  selector: 'app-citation-navigation',
  templateUrl: './citation-navigation.component.html',
  styleUrls: ['./citation-navigation.component.css']
})
export class CitationNavigationComponent implements OnInit {

  @Output() onNext: EventEmitter<any> = new EventEmitter();
  @Output() onPrev: EventEmitter<any> = new EventEmitter();

  public citationsHistory:Citation[] = [];
  private historyIndex:number = -1;

  public curCitation:Citation = null;

  constructor(private citationService:CitationService) { }


  ngOnInit() {
    this.nextCitation();
  }

  public prevCitation()
  {
    if(!this.hasPrev)
    {
      return;
    }
    this.historyIndex--;
    this.curCitation = this.citationsHistory[this.historyIndex];

    this.onPrev.emit(this.curCitation);
  }

  public get hasPrev()
  {
    return !(this.historyIndex <= 0);
  }

  public nextCitation()
  {
    //if we haven't reached the end of pre-loaded historical citations
    //no need to load more YET
    if(this.citationsHistory.length > 0 && this.historyIndex < this.citationsHistory.length-1)
    {
      console.log(this.citationsHistory.length);
      this.historyIndex++;
      this.curCitation = this.citationsHistory[this.historyIndex];
    }
    else
    {
      //if we need to load a new citation from DataBase
      this.citationService.getCitation().subscribe(
        (data) => {
          this.curCitation = data
          this.citationsHistory.push(data);
          this.historyIndex++;

          //trim history if number oh historical citations exceeds 10
          if(this.citationsHistory.length > HISTORY_SIZE)
          {
            this.citationsHistory = this.citationsHistory.slice(this.citationsHistory.length - HISTORY_SIZE);
            this.historyIndex = this.citationsHistory.length-1;
          }
          console.log(this.citationsHistory.length);
        },
        (error) =>  {
          console.log(error)
        });
    }
    this.onNext.emit(this.curCitation);
    /*this.citationService.viewCitation(this.curCitation).subscribe(
      data => this.curCitation = data,
      error =>  console.log(error));*/
  }

}
