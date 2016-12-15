import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {UserService} from "../services/user.service";
import {User} from "../models/user";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public user:User;
  constructor(private route: ActivatedRoute,
              private router: Router, private userService:UserService) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.userService.getUserById(params['id']))
      .subscribe((user: User) => {
        this.user = user
      }, (error) => {
        console.log(error);
      });

    /*
    this.route.params.forEach((params: Params) => {
      let id:String = params['id'];
      this.userService.getUserById(id).subscribe(
        data => this.user = data,
        error =>  console.log(error));
    });*/
  }

}
