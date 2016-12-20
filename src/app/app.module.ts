import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HomeModule} from "./components/smart-components/pages/home/home.module";
import {ProfileModule} from "./components/smart-components/pages/profile/profile.module";
import {SharedModule} from "./shared/shared.module";

import { StoreModule } from "@ngrx/store";

import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { UserModule } from "./user/user.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HomeModule,
    ProfileModule,
    UserModule,
    BrowserModule,
    SharedModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    StoreModule.provideStore({

    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
