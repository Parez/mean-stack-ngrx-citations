import { Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-home',
  template: `
<div class="container">
  <div class="row">
    <div class="col-sm-6">
      <h3>Зарегистрируйтесь</h3>
      <app-user-register-form></app-user-register-form>
    </div>
    <div class="col-sm-6 viewHeight">
      <h3>Случайная цитата</h3>
      <app-citation-navigation class="align-middle card"
                               (onNext)="cit.loadCitation($event)"
                               (onPrev)="cit.loadCitation($event)">
      </app-citation-navigation>
      <app-citation #cit></app-citation>
    </div>
  </div>
</div>`,
  styles: [],

})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
