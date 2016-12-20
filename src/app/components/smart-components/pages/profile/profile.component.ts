import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  template: `<div class="row profile">
  <nav class="profile-menu nav nav-pills nav-stacked col-md-2 col-sm-3">
    <a class="nav-link" [routerLink]="['info']" routerLinkActive="active">
      <i class="fa fa-user"></i> Info
    </a>
    <a class="nav-link" [routerLink]="['citations']" routerLinkActive="active">
      <i class="fa fa-list"></i> My Citations</a>
    <hr>
    <a class="nav-link" [routerLink]="['favourites']" routerLinkActive="active">
      <i class="fa fa-star"></i> Favourite
    </a>
    <a [routerLink]="['history']" class="nav-link" routerLinkActive="active">
      <i class="fa fa-eye"></i> View History</a>
  </nav>

  <div class="col-md-10 col-sm-9">
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  </div>
</div>`,
  styles: [`.profile-menu { border-right: 1px solid #c7d2d5; }`]
})
export class ProfileComponent implements OnInit {

  public curTab:String = "Info";

  constructor() { }

  ngOnInit() {

  }

}
