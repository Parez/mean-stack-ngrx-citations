/**
 * Created by baunov on 25/10/16.
 */
import * as mongoose from 'mongoose';
import {Connection} from 'mongoose';
const mongoURL = process.env.MONGODB_URI || 'mongodb://localhost:27017/';

class MongooseConnection {
  constructor() {
    (<any>mongoose).Promise = global.Promise;
  }

  public connect(dbURL = 'citations'):Promise<Connection> {
    let db = mongoose.connection;

    return new Promise( (resolve, reject) => {
      mongoose.connect(mongoURL+dbURL);
      db.on('error', () => {
        console.error.bind(console, 'connection error:');
        reject('error connecting to db '+dbURL);
      });

      //Logging once connected to database
      db.once('open', function () {
        console.log('Connected to '+mongoURL+dbURL);
        resolve(db);
      });
    });


  }
}

export { MongooseConnection };
