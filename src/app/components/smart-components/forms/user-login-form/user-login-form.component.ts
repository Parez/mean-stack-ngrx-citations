import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {UserService} from "../../services/user.service";
import { NgForm } from "@angular/forms";
import {LoginCredentials} from '../../models/loginCredentials';

@Component({
  selector: 'app-user-login-form',
  templateUrl: 'user-login-form.component.html',
  styleUrls: ['user-login-form.component.css']
})
export class UserLoginFormComponent implements OnInit {
  @Output() onLoggedIn = new EventEmitter<boolean>();
  public model:LoginCredentials;
  public errorMessage:string;

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.model = new LoginCredentials("");
  }

  public onSubmit(form:NgForm)
  {
    this.userService.signIn(this.model).subscribe(
        success => {
          this.onLoggedIn.emit(success.valueOf());
          if(success) {
            console.log("Logged in successfully");
          }
          else {
            console.log("Failed to log in");
          }
        },
        error =>  {
          this.onLoggedIn.emit(false);
          this.errorMessage = <any>error;
        });
  }
}
