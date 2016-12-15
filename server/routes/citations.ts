import {IUser} from '../db/models/user.model';
/**
 * Created by baunov on 25/10/16.
 */
import { Router, Response, Request } from 'express';
const _ = require('lodash');
const {ObjectId} = require('mongodb');
import {auth} from '../middleware/auth';
import {ICitation} from '../db/models/citation.model';
import {Citation} from '../db/logic/citation.logic';
import {Feed} from '../db/logic/feed.logic';

const router: Router = Router();

//get citations published by user
router.get('/user/:id', (req:Request, res:Response) => {
  let userId = req.params.id;
  Citation.getByUser(userId).then( (citations) => {
    res.status(200).send(citations);
  }).catch( (error) => {
    res.status(400).send(error);
  });
});

//get random citations list
router.get('/', (req:Request, res:Response) => {
  Citation.getLatestList().then((citations) => {
    res.status(200).send(citations);
  }).catch( (error) => {
    res.status(400).send(error);
  });
});

//get feed for the authenticated user
router.get('/feed', auth, (req:Request, res:Response) => {
  let userId = req.body.user._id;
  let curDate:Date = new Date();
  let month:number = curDate.getFullYear()*12 + curDate.getMonth();

  Feed.getUserFeed(userId, month).then((citations) => {
    res.status(200).send(citations);
  }).catch( (error) => {
    res.status(400).send(error);
  });
});

//get citation by id
router.get('/:id', (req:Request, res:Response) => {
  let id = req.params.id;

  if(!ObjectId.isValid(id))
  {
    res.status(404).send(`Error: ID ${id} is not valid`);
  }

  Citation.findById(id).then((citation) => {
    res.status(200).send(citation);
  }).catch( (error) => {
    res.status(400).send(error);
  });
});

//Post new citation by authenticated User
router.post('/', auth, (req:Request, res:Response) => {
  let user:IUser = req.body.user as IUser;
  console.log(req.body);
  let citation = <ICitation>(_.pick(req.body, ['text', 'tags', 'author']));
  Citation.addCitation(citation, user).then( (cit:ICitation) => {
    res.send(cit);
  }).catch( (err) => {
    res.status(400).send(err);
  });
});


//Delete citation by authenticated User
router.delete('/:id', auth, (req:Request, res:Response) => {
  let id = req.params.id;
  let userId = req.body.user._id;

  if(!ObjectId.isValid(id))
  {
    res.status(404).send(`Error: ID ${id} is not valid`);
  }

  Citation.findOneAndRemove({_id: id, user: userId}).then((citation) => {
    if(!citation)
    {
      res.status(404).send();
    }
    res.send(citation);
  }).catch( (error) => {
    res.status(400).send(error);
  });
});

router.patch('/like/:id', auth, (req:Request, res:Response) => {
  let id = req.params.id;
  let userId = req.body.user._id;

  if(!ObjectId.isValid(id))
  {
    res.status(404).send(`Error: ID ${id} is not valid`);
  }

  Citation.modifyRank(id, userId, 1).then( (rank) => {
    res.status(200).send(rank);
  }).catch( (err) => {
    res.status(400).send(err);
  });
});

router.patch('/dislike/:id', auth, (req:Request, res:Response) => {
  let id = req.params.id;
  let userId = req.body.user._id;

  if(!ObjectId.isValid(id))
  {
    res.status(404).send(`Error: ID ${id} is not valid`);
  }

  Citation.modifyRank(id, userId, -1).then( (rank) => {
    res.status(200).send(rank);
  }).catch( (err) => {
    res.status(400).send(err);
  });
});

module.exports = router;
