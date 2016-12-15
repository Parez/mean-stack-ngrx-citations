import {IUser} from '../db/models/user.model';
/**
 * Created by baunov on 25/10/16.
 */
import { Router, Response, Request } from 'express';
import {Tag} from '../db/logic/tag.logic';
const _ = require('lodash');
const {ObjectId} = require('mongodb');


const router: Router = Router();

//Get top 10 tags starting with query string
router.get('/:query', (req:Request, res:Response) => {
  let tagStr = req.params.query;
  Tag.searchTag(tagStr, 10).then( (tags) => {
    res.status(200).send(tags);
  }).catch( (error) => {
    res.status(400).send(error);
  });
});

module.exports = router;
