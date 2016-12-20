"use strict";
var citation_1 = require("../models/citation");
var user_1 = require("../models/user");
var user_service_1 = require("../services/user.service");
/**
 * Created by baunov on 14/10/16.
 */
var TestCitationsDB = (function () {
    function TestCitationsDB() {
        this.citArray = [];
        var testUser1 = new user_1.User("ViktorSemis", "parugvai1234", "semis@vik.com", "Виктор Семисынов");
        var testUser2 = new user_1.User("Sugrow", "parugvai1234", "parezguru@gmail.com", "Даниил Баунов");
        user_service_1.UserService.db.addUser(testUser1);
        user_service_1.UserService.db.addUser(testUser2);
        this.citArray.push(new citation_1.Citation("Никуда не ходи, но и на месте не стой", "Толстой Л.Н.", testUser1, ["мотивация", "гений", "парадокс"]));
        this.citArray.push(new citation_1.Citation("Тем у кого нет настоящего, приходится говорить о прошлом.", "Паустовский", testUser1, ["недовольство", "стеб"]));
        this.citArray.push(new citation_1.Citation("Слепец тот - кто не видит.", "Паустовский", testUser1, ["очевидное", "стеб"]));
        this.citArray.push(new citation_1.Citation("Ты ищешь меня в толпе глазами но не находишь. Потому что искать надо руками. Иди на ощупь.", "Паустовский", testUser1, ["стеб", "гений"]));
        this.citArray.push(new citation_1.Citation("когда голодна - съешь даже склизнявую сордельку", "Гулюгина Д.", testUser2, ["диета", "женское", "брошенки"]));
        this.citArray.push(new citation_1.Citation("Ты — грустная сосисочка, брошенная в кастрюлю переживаний.", "Гулюгина Д.", testUser2, ["диета", "женское", "брошенки", "афоризм"]));
        this.citArray.push(new citation_1.Citation("испортить пиццу могут только униженные судьбой оливки", "Гулюгина Д.", testUser2, ["диета", "женское", "брошенки", "стеб"]));
        this.citArray.push(new citation_1.Citation("Отличный повар вронского, привезенный из торжествующей партии новых обедали. Испытывал приятное чувство торжества за столом, празднуя выбор неведовского, он не даст. Весело провел время и поняла, что весело. Выборах за телеграмму такого милого тона в этот день у себя.", "Гулюгина Д.", testUser2, ["рандом", "классика", "веселье"]));
        this.citArray.push(new citation_1.Citation("Никогда не ставь себя выше меня. Никогда. Если вдруг так вышло, что ты стоишь на ступеньке выше - ты должен немедленно присесть.", "Гоголь", testUser2, ["гений", "недовольство", "свэг"]));
    }
    TestCitationsDB.prototype.getUserCitations = function (user) {
        return this.citArray.filter(function (citation) { return citation.publisher._id == user._id; });
    };
    TestCitationsDB.prototype.getById = function (id) {
        for (var i = 0; i < this.citArray.length; i++) {
            if (this.citArray[i]._id == id) {
                return this.citArray[i];
            }
        }
        return new citation_1.Citation("No such citation");
    };
    TestCitationsDB.prototype.getRndCitation = function () {
        var rnd = Math.floor(Math.random() * this.citArray.length);
        return this.citArray[rnd];
    };
    TestCitationsDB.prototype.addCitation = function (citation) {
        this.citArray.push(citation);
        return citation;
    };
    TestCitationsDB.prototype.likeCitation = function (id) {
        var cit = this.getById(id);
        cit.likes++;
        cit.rank++;
        //cit.rank = this.calculateRank(cit.likes, cit.dislikes);
        return cit;
    };
    TestCitationsDB.prototype.dislikeCitation = function (id) {
        var cit = this.getById(id);
        cit.dislikes++;
        cit.rank--;
        //cit.rank = this.calculateRank(cit.likes, cit.dislikes);
        return cit;
    };
    TestCitationsDB.prototype.calculateRank = function (likes, dislikes) {
        return likes == 0 ? 0 : likes / (likes + dislikes);
    };
    TestCitationsDB.prototype.viewCitation = function (id) {
        var cit = this.getById(id);
        cit.views++;
        return cit;
    };
    TestCitationsDB.prototype.getList = function (num) {
        return this.citArray.slice(0, num);
    };
    return TestCitationsDB;
}());
exports.TestCitationsDB = TestCitationsDB;
