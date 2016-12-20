"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require("@angular/forms");
var CitationFormComponent = (function () {
    function CitationFormComponent(fb) {
        this.fb = fb;
        this.submit = new core_1.EventEmitter(false);
        this.form = this.fb.group({
            text: ["", forms_1.Validators.required, forms_1.Validators.minLength(10), forms_1.Validators.maxLength(300)],
            authorGroup: this.fb.group({
                author: ["", forms_1.Validators.maxLength(50)],
                iAmAuthor: true
            }),
            tags: []
        });
        this.form.get("author").disable(true);
    }
    CitationFormComponent.prototype.onSubmit = function (form) {
        if (this.form.valid) {
            this.submit.emit(this.form.value);
        }
        return false;
    };
    __decorate([
        core_1.Output()
    ], CitationFormComponent.prototype, "submit", void 0);
    CitationFormComponent = __decorate([
        core_1.Component({
            selector: 'app-citation-form',
            templateUrl: './citation-form.component.html',
            styleUrls: ['./citation-form.component.css']
        })
    ], CitationFormComponent);
    return CitationFormComponent;
}());
exports.CitationFormComponent = CitationFormComponent;
