import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import {UserModule} from "../../user/user.module";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    UserModule,
    SharedModule
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
