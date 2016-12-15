"use strict";
var user_1 = require("./user");
/**
 * Created by baunov on 14/10/16.
 */
var Citation = (function () {
    function Citation(text, author, user, tags, date_published, rank, views, likes, dislikes) {
        if (text === void 0) { text = ""; }
        if (author === void 0) { author = "Unknown"; }
        if (user === void 0) { user = new user_1.User("Anonymous"); }
        if (tags === void 0) { tags = []; }
        if (date_published === void 0) { date_published = Date.now(); }
        if (rank === void 0) { rank = 0; }
        if (views === void 0) { views = 0; }
        if (likes === void 0) { likes = 0; }
        if (dislikes === void 0) { dislikes = 0; }
        this.text = text;
        this.author = author;
        this.user = user;
        this.tags = tags;
        this.date_published = date_published;
        this.rank = rank;
        this.views = views;
        this.likes = likes;
        this.dislikes = dislikes;
        //public static curId = 0;
        this._id = "";
        //this._id = String(Citation.curId);
        //Citation.curId++;
    }
    return Citation;
}());
exports.Citation = Citation;
