"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var home_component_1 = require("./components/smart-components/pages/home/home.component");
var profile_component_1 = require("./components/smart-components/pages/profile/profile.component");
var user_citations_component_1 = require("./user/user-citations/user-citations.component");
var user_info_component_1 = require("./user/user-info/user-info.component");
var user_favourites_component_1 = require("./user/user-favourites/user-favourites.component");
var user_view_history_component_1 = require("./user/user-view-history/user-view-history.component");
var user_component_1 = require("./user/user.component");
var citation_list_component_1 = require("./citation/citation-list/citation-list.component");
var routes = [
    { path: '', component: home_component_1.HomeComponent },
    { path: 'profile', component: profile_component_1.ProfileComponent,
        children: [
            { path: '', redirectTo: 'info', pathMatch: 'full' },
            { path: 'info', component: user_info_component_1.UserInfoComponent },
            { path: 'citations', component: user_citations_component_1.UserCitationsComponent },
            { path: 'favourites', component: user_favourites_component_1.UserFavouritesComponent },
            { path: 'history', component: user_view_history_component_1.UserViewHistoryComponent },
        ]
    },
    { path: 'user/:id', component: user_component_1.UserComponent },
    { path: 'tag/:id', component: citation_list_component_1.CitationListComponent }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule],
            providers: []
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
