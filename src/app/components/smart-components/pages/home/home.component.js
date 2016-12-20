"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var HomeComponent = (function () {
    function HomeComponent() {
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent.prototype.openCitationForm = function () {
        //TODO popup create citation form
        console.log("Form Opened");
    };
    HomeComponent.prototype.nextCitation = function () {
        //TODO update Citation component (ask to fetch new citation)
        //Look http://stackoverflow.com/questions/31013461/call-a-method-of-the-child-component
        //via DataBinding
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: "\n<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-sm-6\">\n      <h3>\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u0443\u0439\u0442\u0435\u0441\u044C</h3>\n      <app-user-register-form></app-user-register-form>\n    </div>\n    <div class=\"col-sm-6 viewHeight\">\n      <h3>\u0421\u043B\u0443\u0447\u0430\u0439\u043D\u0430\u044F \u0446\u0438\u0442\u0430\u0442\u0430</h3>\n      <app-citation-navigation class=\"align-middle card\"\n                               (onNext)=\"cit.loadCitation($event)\"\n                               (onPrev)=\"cit.loadCitation($event)\">\n      </app-citation-navigation>\n      <app-citation #cit></app-citation>\n    </div>\n  </div>\n</div>",
            styleUrls: [],
        })
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
