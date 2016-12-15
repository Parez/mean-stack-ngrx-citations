/**
 * Created by baunov on 25/11/16.
 */
import {Connection} from 'mongoose';
import * as mongoose from 'mongoose';

/*
const homeSalesSchema:mongoose.Schema = new mongoose.Schema({
  amount: {type: Number},
  date: {type: Date},
  address: {
    nameOrNumber: {type: Number},
    street: {type: String},
    town: {type: String},
    county: {type: String},
    postcode: {type: String}
  }
});*/

const homeSalesSchema:mongoose.Schema = new mongoose.Schema({}, { strict: false });
const postcodesSchema:mongoose.Schema = new mongoose.Schema({}, { strict: false });

/*
const postcodesSchema:mongoose.Schema = new mongoose.Schema({
  postcode: {type:String},
  location: {
    type: {
      type:String,
      coordinates: [
        {type: Number}
      ]
    }
  }
});*/

const HomeSales = mongoose.model('HomeSales', homeSalesSchema, 'homeSales');
const Postcodes = mongoose.model('Postcodes', postcodesSchema, 'postcodes');

export class MongoQueries {
  constructor(private db:Connection){

  }

  public findMany():void
  {
    HomeSales.aggregate([
      {
        $match: {}
      },
      {
        $group: {
          _id: '$address.postcode',
          totalPrice: {$sum: '$amount'},
          houses: {$push: {'houseNumber': '$address.nameOrNumber', 'price': '$amount'} }
        }
      },
      {
        $sort: {
          totalPrice: -1
        }
      },
      {
        $limit: 1
      },
      //Sort inner array
      {$unwind: '$houses'},
      {$sort: {'houses.price': -1}},
      {$group: {_id: '$_id', 'houses': {$push: '$houses'}}},
    ]).then( (docs) => {
        console.log(JSON.stringify(docs, null, 2));
    });
  }
}
