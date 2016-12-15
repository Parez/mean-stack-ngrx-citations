import { Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openCitationForm():void
  {
    //TODO popup create citation form
    console.log("Form Opened");
  }

  nextCitation():void
  {

    //TODO update Citation component (ask to fetch new citation)
    //Look http://stackoverflow.com/questions/31013461/call-a-method-of-the-child-component
    //via DataBinding
  }
}
