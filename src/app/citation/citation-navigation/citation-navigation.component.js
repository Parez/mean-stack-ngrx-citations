"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var HISTORY_SIZE = 100;
var CitationNavigationComponent = (function () {
    function CitationNavigationComponent(citationService) {
        this.citationService = citationService;
        this.onNext = new core_1.EventEmitter();
        this.onPrev = new core_1.EventEmitter();
        this.citationsHistory = [];
        this.historyIndex = -1;
        this.curCitation = null;
    }
    CitationNavigationComponent.prototype.ngOnInit = function () {
        this.nextCitation();
    };
    CitationNavigationComponent.prototype.prevCitation = function () {
        if (!this.hasPrev) {
            return;
        }
        this.historyIndex--;
        this.curCitation = this.citationsHistory[this.historyIndex];
        this.onPrev.emit(this.curCitation);
    };
    Object.defineProperty(CitationNavigationComponent.prototype, "hasPrev", {
        get: function () {
            return !(this.historyIndex <= 0);
        },
        enumerable: true,
        configurable: true
    });
    CitationNavigationComponent.prototype.nextCitation = function () {
        var _this = this;
        //if we haven't reached the end of pre-loaded historical citations
        //no need to load more YET
        if (this.citationsHistory.length > 0 && this.historyIndex < this.citationsHistory.length - 1) {
            console.log(this.citationsHistory.length);
            this.historyIndex++;
            this.curCitation = this.citationsHistory[this.historyIndex];
        }
        else {
            //if we need to load a new citation from DataBase
            this.citationService.getCitation().subscribe(function (data) {
                _this.curCitation = data;
                _this.citationsHistory.push(data);
                _this.historyIndex++;
                //trim history if number oh historical citations exceeds 10
                if (_this.citationsHistory.length > HISTORY_SIZE) {
                    _this.citationsHistory = _this.citationsHistory.slice(_this.citationsHistory.length - HISTORY_SIZE);
                    _this.historyIndex = _this.citationsHistory.length - 1;
                }
                console.log(_this.citationsHistory.length);
            }, function (error) {
                console.log(error);
            });
        }
        this.onNext.emit(this.curCitation);
        /*this.citationService.viewCitation(this.curCitation).subscribe(
          data => this.curCitation = data,
          error =>  console.log(error));*/
    };
    __decorate([
        core_1.Output()
    ], CitationNavigationComponent.prototype, "onNext", void 0);
    __decorate([
        core_1.Output()
    ], CitationNavigationComponent.prototype, "onPrev", void 0);
    CitationNavigationComponent = __decorate([
        core_1.Component({
            selector: 'app-citation-navigation',
            template: "\n<div class=\"btn-group btn-block\">\n  <button class=\"btn btn-primary col-md-6\" [ngClass]=\"{'disabled': !hasPrev}\" (click)=\"prevCitation()\">\n    <i class=\"fa fa-chevron-left\" aria-hidden=\"false\"></i></button>\n  <button class=\"btn btn-primary col-md-6\" (click)=\"nextCitation()\">\n    <i class=\"fa fa-chevron-right\" aria-hidden=\"false\"></i></button>\n</div>",
            styleUrls: ['./citation-navigation.component.css']
        })
    ], CitationNavigationComponent);
    return CitationNavigationComponent;
}());
exports.CitationNavigationComponent = CitationNavigationComponent;
