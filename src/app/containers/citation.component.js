"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var CitationComponent = (function () {
    function CitationComponent() {
        this.likeCitation = new core_1.EventEmitter();
        this.dislikeCitation = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input()
    ], CitationComponent.prototype, "citation", void 0);
    __decorate([
        core_1.Output()
    ], CitationComponent.prototype, "likeCitation", void 0);
    __decorate([
        core_1.Output()
    ], CitationComponent.prototype, "dislikeCitation", void 0);
    CitationComponent = __decorate([
        core_1.Component({
            selector: 'app-citation',
            template: "\n<div class=\"card card-outline-secondary\">\n  <div class=\"card-header\">\n    <a [routerLink]=\"['/user', citation.publisher._id]\" class=\"btn-link\">{{citation.user.username}}</a>\n  </div>\n\n  <div class=\"card-block\">  \n  <h5 class=\"card-title m-0\">\n    {{citation.text | capitalizeFirstLetter}}\n  </h5>\n  <a href=\"#\" class=\"btn-link card-text\"><small class=\"text-muted\">\u00A9 {{citation.author}}</small></a>\n  </div>\n  \n  <div *ngIf=\"citation.tags.length > 0\" class=\"list-group list-group-item\">\n    <a *ngFor=\"let tag of citation.tags\" [routerLink]=\"['/tag', tag]\" class=\"list-inline-item btn-link\">#{{tag}}</a>\n  </div>\n  \n  <div class=\"card-footer\">\n    <div class=\"row\">\n      <span class=\"col-md-4\">\n        <small class=\"text-muted\">Views: {{citation.views}}</small>\n      </span>\n      <span class=\"col-md-4\">13</span>\n      <span class=\"col-md-2\">\n        <i>200</i>\n      </span>\n      \n      <app-citation-rank \n        [rank]=\"citation.rank\" \n        (like)=\"likeCitation.emit(citation._id)\" \n        (dislike)=\"dislikeCitation.emit(citation._id)\">\n      </app-citation-rank>\n      \n    </div>\n  </div>\n\n</div>",
            styleUrls: ['./citation.component.css']
        })
    ], CitationComponent);
    return CitationComponent;
}());
exports.CitationComponent = CitationComponent;
