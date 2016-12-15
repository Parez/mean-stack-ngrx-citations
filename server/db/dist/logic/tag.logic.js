"use strict";
/**
 * Created by baunov on 25/10/16.
 */
const tag_model_1 = require('../models/tag.model');
const _ = require('lodash');
class Tag extends tag_model_1.TagModel {
    constructor(document) {
        super(document);
        this._document = document;
        console.log("Document:" + document);
    }
    //for search-box fast suggestions
    static searchTag(searchText, limit = 10) {
        let re = new RegExp('^' + searchText);
        return this.find({ text: { $regex: re } }).limit(limit).exec();
    }
    static addTags(tags) {
        console.log(tags);
        let lowerTags = tags.map(tag => {
            return String(tag).toLowerCase();
        });
        //console.log(JSON.stringify(lowerTags));
        let tagObjs = lowerTags.map(tag => new tag_model_1.TagModel({ text: tag, num: 1 }));
        console.log("tagObjs " + tagObjs.length);
        console.log("lowerTags " + lowerTags.length);
        tag_model_1.TagModel.find({ text: { $in: lowerTags } }).exec().then((foundTags) => {
            this.update({ text: { $in: lowerTags } }, { $inc: { num: 1 } }, { multi: true }).exec().catch(err => {
                console.log(err);
            });
            _.pullAllBy(tagObjs, foundTags, "text");
            if (tagObjs.length <= 0) {
                return;
            }
            this.insertMany(tagObjs);
        }).catch(err => {
            console.log(err);
        });
        /**/
        /*this.collection.insertMany(lowerTags).catch(err => {
          console.log(err);
        });*/
    }
    get text() {
        return this._document.text;
    }
    get num() {
        return this._document.num;
    }
}
exports.Tag = Tag;
//# sourceMappingURL=tag.logic.js.map