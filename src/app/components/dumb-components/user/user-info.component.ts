import {Component, OnInit, Input} from '@angular/core';
import {User} from '../../../models/user';

@Component({
  selector: 'app-user-info',
  template: `
<h3>{{user.username}}</h3>
<h3>{{user.name}}</h3>
<h3>{{user.email}}</h3>
<h3>{{user.rank}}</h3>`,
  styleUrls: []
})
export class UserInfoComponent implements OnInit {

  @Input() user: User;
  constructor() {
  }

  ngOnInit() {
  }

}
