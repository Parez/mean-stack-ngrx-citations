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
    function CitationNavigationComponent() {
        this.next = new core_1.EventEmitter();
        this.prev = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Output()
    ], CitationNavigationComponent.prototype, "next", void 0);
    __decorate([
        core_1.Output()
    ], CitationNavigationComponent.prototype, "prev", void 0);
    CitationNavigationComponent = __decorate([
        core_1.Component({
            selector: 'app-citation-navigation',
            template: "\n<div class=\"btn-group btn-block\">\n  <button class=\"btn btn-primary col-md-6\" [ngClass]=\"{'disabled': !hasPrev}\" (click)=\"prev.emit($event)\">\n    <i class=\"fa fa-chevron-left\" aria-hidden=\"false\"></i></button>\n  <button class=\"btn btn-primary col-md-6\" (click)=\"next.emit($event)\">\n    <i class=\"fa fa-chevron-right\" aria-hidden=\"false\"></i></button>\n</div>"
        })
    ], CitationNavigationComponent);
    return CitationNavigationComponent;
}());
exports.CitationNavigationComponent = CitationNavigationComponent;
