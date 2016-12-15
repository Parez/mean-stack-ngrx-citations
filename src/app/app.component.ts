import { Component, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import {UserService} from './services/user.service';
import {User} from './models/user';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loggedIn = false;

  constructor(private overlay: Overlay, private vcRef: ViewContainerRef, public modal: Modal, private userService:UserService)
  {
    overlay.defaultViewContainer = vcRef;
  }

  public onLogin(isLoggedIn:boolean)
  {
    console.log(isLoggedIn);
    this.loggedIn = isLoggedIn;
    if(isLoggedIn)
    {
      this.userService.getProfileInfo().subscribe( (info:User) => {
        alert("Successfully logged in as "+info.username);
      });
    }
    else {
      alert("failed to log in");
    }
  }

  public onRegisterOpen()
  {
    this.modal.confirm()
      .size('lg')
      .isBlocking(false)
      .showClose(true)
      .keyboard(27)
      .title('Register or LogIn')
      .body('A Customized Modal')
      .okBtn('Register')
      .open();
  }
}
