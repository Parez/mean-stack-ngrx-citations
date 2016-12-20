"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
require('rxjs/Rx');
var Rx_1 = require('rxjs/Rx');
var http_1 = require('@angular/http');
var TestCitationsDB_1 = require("../citation/TestCitationsDB");
var user_1 = require("../models/user");
var _ = require('lodash');
var CitationService = (function () {
    function CitationService(http) {
        this.http = http;
        this.citationsUrl = "citations/";
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.options = new http_1.RequestOptions({ headers: this.headers });
        CitationService.db = new TestCitationsDB_1.TestCitationsDB();
    }
    CitationService.prototype.getCitationById = function (id) {
        return new Rx_1.Observable(function (observer) { return observer.next(CitationService.db.getById(id)); });
        /*this.http.get(this.citationsUrl+id)
          .map(res => res.json())
          .catch(this.handleError);*/
    };
    CitationService.prototype.getCitation = function () {
        return new Rx_1.Observable(function (observer) { return observer.next(CitationService.db.getRndCitation()); });
    };
    CitationService.prototype.viewCitation = function (citation) {
        return new Rx_1.Observable(function (observer) { return observer.next(CitationService.db.viewCitation(citation._id)); });
    };
    CitationService.prototype.getUserFeed = function () {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers.append('x-auth', user_1.User.token);
        var reqOptions = new http_1.RequestOptions({ headers: this.headers });
        return this.http.get(this.citationsUrl + "feed", reqOptions).map(function (response) {
            return response.json();
        }, function (err) {
            _this.handleError(err);
        });
    };
    CitationService.prototype.getUserCitations = function (userId) {
        var _this = this;
        if (userId === void 0) { userId = ""; }
        //if user is not passed, get citations by currently logged in user
        var id = (userId) ? userId : user_1.User.localUser._id;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers.append('x-auth', user_1.User.token);
        var reqOptions = new http_1.RequestOptions({ headers: this.headers });
        return this.http.get(this.citationsUrl + "user/" + id, reqOptions).map(function (response) {
            return response.json();
        }, function (err) {
            _this.handleError(err);
        });
        //return new Observable<Citation>(observer => observer.next(CitationService.db.getUserCitations(user)));
    };
    CitationService.prototype.likeCitation = function (citation) {
        return new Rx_1.Observable(function (observer) { return observer.next(CitationService.db.likeCitation(citation._id)); });
    };
    CitationService.prototype.dislikeCitation = function (citation) {
        return new Rx_1.Observable(function (observer) { return observer.next(CitationService.db.dislikeCitation(citation._id)); });
    };
    CitationService.prototype.addCitation = function (citation) {
        var _this = this;
        this.options.headers.set('x-auth', user_1.User.token);
        var citationInfo = _.pick(citation, ["text", "tags", "author"]);
        return this.http.post(this.citationsUrl, citationInfo, this.options).map(function (response) {
            return response.json();
        }, function (err) {
            _this.handleError(err);
        });
        //return new Observable<Citation>(observer => observer.next(CitationService.db.addCitation(citation)));
    };
    CitationService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error("CitationService" + errMsg); // log to console instead
        return Rx_1.Observable.throw(errMsg);
    };
    CitationService = __decorate([
        core_1.Injectable()
    ], CitationService);
    return CitationService;
}());
exports.CitationService = CitationService;
