import { NgModule } from '@angular/core';
import {CitationModule} from "../../citation/citation.module";
import {HomeComponent} from "./home.component";
import {SharedModule} from "../../shared/shared.module";
import {UserModule} from "../../user/user.module";

@NgModule({
  imports: [
    CitationModule,
    SharedModule,
    UserModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
