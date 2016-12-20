"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var citation_component_1 = require('./citation.component');
var citation_service_1 = require("../services/citation.service");
var citation_form_component_1 = require('../components/smart-components/forms/citation-form/citation-form.component');
var shared_module_1 = require("../shared/shared.module");
var citation_navigation_component_1 = require('../components/dumb-components/citation/citation-navigation.component');
var citation_list_component_1 = require('./citation-list/citation-list.component');
var citation_add_form_component_1 = require('./citation-add-form/citation-add-form.component');
var CitationModule = (function () {
    function CitationModule() {
    }
    CitationModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule
            ],
            declarations: [citation_component_1.CitationComponent, citation_form_component_1.CitationFormComponent, citation_navigation_component_1.CitationNavigationComponent, citation_list_component_1.CitationListComponent, citation_add_form_component_1.CitationAddFormComponent],
            providers: [citation_service_1.CitationService],
            exports: [citation_component_1.CitationComponent, citation_form_component_1.CitationFormComponent, citation_navigation_component_1.CitationNavigationComponent, citation_list_component_1.CitationListComponent]
        })
    ], CitationModule);
    return CitationModule;
}());
exports.CitationModule = CitationModule;
