/**
 * Created by baunov on 25/10/16.
 */
import * as _ from 'lodash';
import { Router, Response, Request, NextFunction } from 'express';
import {User} from '../db/logic/user.logic';
import {IUser} from '../db/models/user.model';
import {auth} from '../middleware/auth';
const {ObjectId} = require('mongodb');
const router: Router = Router();


router.get('/me', auth, (req: Request, res: Response) => {
  let user:IUser = req.body.user;
  res.status(200).send(_.omit(user, 'password'));
});

//publisher's id
router.post('/subscribe/:id', auth, (req: Request, res: Response) => {
  let subscriberId:string = req.body.user._id; //
  let publisherId:string = req.params.id; //на кого оформляется подписка

  User.subscribe(subscriberId, publisherId).then( (user:IUser) => {
    if(!user)
    {
      res.status(404).send(`Error: Publisher ${publisherId} not found`);
    }
    res.send((new User(user)).getInfo());
  }).catch( (error) => {
    res.status(400).send(error);
  });
});

//publisher's id
router.post('/unsubscribe/:id', auth, (req: Request, res: Response) => {
  let subscriberId:string = req.body.user._id; //
  let publisherId:string = req.params.id; //на кого оформляется подписка

  User.subscribe(subscriberId, publisherId).then( (user:IUser) => {
    if(!user)
    {
      res.status(404).send(`Error: Publisher ${publisherId} not found`);
    }
    res.send((new User(user)).getInfo());
  }).catch( (error) => {
    res.status(400).send(error);
  });
});

//Get user by ID
router.get('/:id', (req: Request, res: Response) => {
  let id = req.params.id;

  if (!ObjectId.isValid(id)) {
    console.log(`ID ${id} is not valid`);
    res.status(404).send(`Error: ID ${id} is not valid`);
  }

  User.findById(id).then( (user) => {
    if(!user)
    {
      res.status(404).send(`Error: User ${id} not found`);
    }
    res.send((new User(user)).getInfo());
  }).catch( (error) => {
    res.status(400).send(error);
  });
});

//login existing user
router.post('/signin', (req: Request, res: Response) => {
  let cred:string = req.body.cred;
  let pass:string = req.body.pass;
  let tempUser:IUser = <IUser>{};
  console.log("Sign in: "+ cred + " " + pass);
  User.loginByCredential(cred, pass).then( (user:IUser) => {
    tempUser = user;
    console.log(tempUser);
    return User.generateAuthToken(user);
  }).then( (token) => {
    res.header('x-auth', token).send((new User(tempUser)).getInfo());
  }).catch( (err) => {
    res.status(401).send(err);
  });
});

//Create new User in DB; sign up new user
router.post('/signup', (req: Request, res: Response) => {
  let userObj:IUser = new User(<IUser>_.pick(req.body, ['email', 'password', 'username', 'name']));
  let tempUser:IUser = <IUser>{};
  console.log("Body: "+JSON.stringify(userObj));
  User.registerUser(userObj).then( (user:IUser) => {
    tempUser = user;
    return User.generateAuthToken(user);
  }).then( (token) => {
    res.header('x-auth', token).send((new User(tempUser)).getInfo());
  }).catch( (err) => {
    console.log(err);
    res.status(400).send(err);
  });
});



module.exports = router;

/*
 router.get("/", (req, res) => {
 Citation.find({}).then((docs) => {
 res.status(200).send(docs);
 }).catch( (error) => {
 res.status(400).send(error);
 })
 });



 router.post('/', (req, res) => {
 console.log(req.body);
 var citation = new Citation(_.pick(req.body, ["text", "author"]));

 citation.save().then(
 (doc) => {
 res.send(doc);
 },
 (error) => {
 res.status(400).send(error);
 }
 );
 });

 router.delete("/:id", (req, res) => {
 var id = req.params.id;

 if(!ObjectId.isValid(id))
 {
 console.log(`ID ${id} is not valid`);
 res.status(404).send(`Error: ID ${id} is not valid`);
 }

 Citation.findByIdAndRemove(id).then((doc) => {
 if(!doc)
 {
 res.status(404).send();
 }

 res.send(doc);
 }).catch( (error) => {
 res.status(400).send();
 })
 });

 router.patch("/like/:id", (req, res) => {
 var id = req.params.id;

 if(!ObjectId.isValid(id))
 {
 console.log(`ID ${id} is not valid`);
 res.status(404).send(`Error: ID ${id} is not valid`);
 }



 Citation.findByIdAndUpdate(id, {$inc: {likes: 1}}, {new: true}).then((citation) => {
 if(!citation) res.status(404).send();

 res.send({citation});
 }).catch( (error) => {
 res.status(400).send(error);
 });

 console.log(req.body);
 });
 */

