import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegisterFormComponent } from '../components/smart-components/forms/user-register-form/user-register-form.component';
import {UserService} from "../services/user.service";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserLoginFormComponent } from '../components/smart-components/forms/user-login-form/user-login-form.component';
import { UserInfoComponent } from '../components/dumb-components/user/user-info.component';
import { UserCitationsComponent } from './user-citations/user-citations.component';
import { UserFavouritesComponent } from './user-favourites/user-favourites.component';
import { UserViewHistoryComponent } from './user-view-history/user-view-history.component';
import {UserComponent} from "./user.component";
import {CitationModule} from '../citation/citation.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CitationModule
  ],
  declarations: [
    UserComponent,
    UserRegisterFormComponent,
    UserLoginFormComponent,
    UserInfoComponent,
    UserCitationsComponent,
    UserFavouritesComponent,
    UserViewHistoryComponent
  ],
  providers: [UserService],
  exports: [
    UserRegisterFormComponent,
    UserLoginFormComponent,
    UserInfoComponent,
    UserCitationsComponent,
    UserFavouritesComponent,
    UserViewHistoryComponent,
    UserComponent
  ]
})
export class UserModule { }
