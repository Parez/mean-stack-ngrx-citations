import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./components/smart-components/pages/home/home.component";
import {ProfileComponent} from "./components/smart-components/pages/profile/profile.component";
import {UserCitationsComponent} from "./user/user-citations/user-citations.component";
import {UserInfoComponent} from "./components/dumb-components/user/user-info.component";
import {UserFavouritesComponent} from "./user/user-favourites/user-favourites.component";
import {UserViewHistoryComponent} from "./user/user-view-history/user-view-history.component";
import {UserComponent} from "./user/user.component";
import {CitationListComponent} from "./citation/citation-list/citation-list.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent,
    children: [
      { path: '', redirectTo: 'info', pathMatch: 'full' },
      { path: 'info', component: UserInfoComponent },
      { path: 'citations', component: UserCitationsComponent },
      { path: 'favourites', component: UserFavouritesComponent },
      { path: 'history', component: UserViewHistoryComponent },
    ]
  },
  { path: 'user/:id', component: UserComponent },
  { path: 'tag/:id', component: CitationListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
