import {Component, OnInit, Input} from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';

import {Citation} from "../models/citation";
import {CitationService} from "../services/citation.service";
import {CitationNavigationComponent} from "./citation-navigation/citation-navigation.component";

@Component({
  selector: 'app-citation',
  templateUrl: './citation.component.html',
  styleUrls: ['./citation.component.css']
})
export class CitationComponent implements OnInit, AfterViewInit {

  @Input() citation: Citation;
  @ViewChild(CitationNavigationComponent) navComponent: CitationNavigationComponent;


  constructor(private citationService:CitationService) { }

  ngOnInit() {
    //this.nextCitation();
  }

  ngAfterViewInit() {
    // Redefine `seconds()` to get from the `CountdownTimerComponent.seconds` ...
    // but wait a tick first to avoid one-time devMode
    // unidirectional-data-flow-violation error
    //this.citation = this.navComponent.curCitation;
    setTimeout(() => this.citation = this.navComponent.curCitation, 0);
  }

  public loadCitation(cit:Citation)
  {
    this.citation = cit;
  }

  public getRankClass():String
  {
    if(this.citation.rank === 0) return "text-muted";
    if(this.citation.rank < 0) return "text-danger";
    if(this.citation.rank > 0) return "text-success";
  }

  public likeCitation()
  {
    this.citationService.likeCitation(this.citation).subscribe(
      data => this.citation = data,
      error =>  console.log(error));
  }

  public dislikeCitation()
  {
    this.citationService.dislikeCitation(this.citation).subscribe(
      data => this.citation = data,
      error =>  console.log(error));
  }
}
