import { NgModule } from '@angular/core';
import { CitationComponent } from './citation.component';
import {CitationService} from "../services/citation.service";
import { CitationFormComponent } from './citation-form/citation-form.component';
import {SharedModule} from "../shared/shared.module";
import { CitationNavigationComponent } from './citation-navigation/citation-navigation.component';
import { CitationListComponent } from './citation-list/citation-list.component';
import { CitationAddFormComponent } from './citation-add-form/citation-add-form.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [CitationComponent, CitationFormComponent, CitationNavigationComponent, CitationListComponent, CitationAddFormComponent],
  providers: [CitationService],
  exports: [CitationComponent, CitationFormComponent, CitationNavigationComponent, CitationListComponent]
})
export class CitationModule { }
