/**
 * Created by baunov on 29/10/16.
 */
import {User} from '../db/logic/user.logic';
import { Response, Request, NextFunction } from 'express';
import {IUser} from '../db/models/user.model';

export const auth = (req:Request, res:Response, next:NextFunction) => {
    let token = req.header('x-auth');
    User.findByToken(token).then((user:IUser) => {
      console.log("User found");
      if (!user) {
          return Promise.reject(new Error('Auth failed'));
      }
      req.body.user = user;
      req.body.token = token;
      next();
    }).catch((e) => {
        //Authentication error
        res.status(401).send();
    });
};
