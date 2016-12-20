"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var core_2 = require('@angular/core');
var citation_navigation_component_1 = require("../components/dumb-components/citation/citation-navigation.component");
var CitationComponent = (function () {
    function CitationComponent(citationService) {
        this.citationService = citationService;
    }
    CitationComponent.prototype.ngOnInit = function () {
        //this.nextCitation();
    };
    CitationComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        // Redefine `seconds()` to get from the `CountdownTimerComponent.seconds` ...
        // but wait a tick first to avoid one-time devMode
        // unidirectional-data-flow-violation error
        //this.citation = this.navComponent.curCitation;
        setTimeout(function () { return _this.citation = _this.navComponent.curCitation; }, 0);
    };
    CitationComponent.prototype.loadCitation = function (cit) {
        this.citation = cit;
    };
    CitationComponent.prototype.getRankClass = function () {
        if (this.citation.rank === 0)
            return "text-muted";
        if (this.citation.rank < 0)
            return "text-danger";
        if (this.citation.rank > 0)
            return "text-success";
    };
    CitationComponent.prototype.likeCitation = function () {
        var _this = this;
        this.citationService.likeCitation(this.citation).subscribe(function (data) { return _this.citation = data; }, function (error) { return console.log(error); });
    };
    CitationComponent.prototype.dislikeCitation = function () {
        var _this = this;
        this.citationService.dislikeCitation(this.citation).subscribe(function (data) { return _this.citation = data; }, function (error) { return console.log(error); });
    };
    __decorate([
        core_1.Input()
    ], CitationComponent.prototype, "citation", void 0);
    __decorate([
        core_2.ViewChild(citation_navigation_component_1.CitationNavigationComponent)
    ], CitationComponent.prototype, "navComponent", void 0);
    CitationComponent = __decorate([
        core_1.Component({
            selector: 'app-citation',
            templateUrl: './citation.component.html',
            styleUrls: ['./citation.component.css']
        })
    ], CitationComponent);
    return CitationComponent;
}());
exports.CitationComponent = CitationComponent;
