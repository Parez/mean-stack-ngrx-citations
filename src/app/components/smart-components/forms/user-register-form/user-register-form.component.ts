import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import { NgForm } from "@angular/forms";
import {RegisterCredentials} from '../../models/registerCredentials';

@Component({
  selector: 'app-user-register-form',
  templateUrl: 'user-register-form.component.html',
  styleUrls: ['user-register-form.component.css']
})

export class UserRegisterFormComponent implements OnInit {
  submitted:Boolean = false;
  model:RegisterCredentials;
  errorMessage:String;

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.model = new RegisterCredentials("");
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.submitted = true;
    this.userService.signUp(this.model)
      .subscribe(
        data => console.log("Published"+JSON.stringify(data)),
        error =>  this.errorMessage = <any>error);
  }
}
