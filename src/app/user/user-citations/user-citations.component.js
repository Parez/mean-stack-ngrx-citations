"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var user_1 = require('../../models/user');
var UserCitationsComponent = (function () {
    function UserCitationsComponent(citationService) {
        this.citationService = citationService;
    }
    UserCitationsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.citationService.getUserCitations(user_1.User.localUser._id).subscribe(function (data) {
            _this.userCitations = data;
        }, function (error) {
            console.log(error);
        });
    };
    UserCitationsComponent = __decorate([
        core_1.Component({
            selector: 'app-user-citations',
            templateUrl: './user-citations.component.html',
            styleUrls: ['./user-citations.component.css']
        })
    ], UserCitationsComponent);
    return UserCitationsComponent;
}());
exports.UserCitationsComponent = UserCitationsComponent;
