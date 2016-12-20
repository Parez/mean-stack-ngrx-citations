"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var capitalize_first_letter_pipe_1 = require("./pipes/capitalize-first-letter.pipe");
var app_routing_module_1 = require("../app-routing.module");
var ng2_tag_input_1 = require('ng2-tag-input');
var SharedModule = (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                http_1.HttpModule,
                app_routing_module_1.AppRoutingModule,
                ng2_tag_input_1.TagInputComponent
            ],
            declarations: [
                capitalize_first_letter_pipe_1.CapitalizeFirstLetterPipe
            ],
            exports: [common_1.CommonModule, forms_1.FormsModule, http_1.HttpModule, capitalize_first_letter_pipe_1.CapitalizeFirstLetterPipe, app_routing_module_1.AppRoutingModule, ng2_tag_input_1.TagInputComponent]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
