import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {CapitalizeFirstLetterPipe} from "./pipes/capitalize-first-letter.pipe";
import {AppRoutingModule} from "../app-routing.module";
import { TagInputComponent } from 'ng2-tag-input';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    AppRoutingModule,
    TagInputComponent
  ],
  declarations: [
    CapitalizeFirstLetterPipe
  ],
  exports: [CommonModule, FormsModule, HttpModule, CapitalizeFirstLetterPipe, AppRoutingModule, TagInputComponent]
})
export class SharedModule { }
