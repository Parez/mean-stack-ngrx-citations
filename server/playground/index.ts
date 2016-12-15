/**
 * Created by baunov on 25/11/16.
 */
import * as express from 'express';
import * as bodyParser from 'body-parser';
import {MongooseConnection} from '../db/mongoose';
import * as path from 'path';
import {Connection} from 'mongoose';
import {MongoQueries} from './mongoQueries';

console.log('Started playground');

const connection: MongooseConnection = new MongooseConnection();
connection.connect('sales').then( (db:Connection) => {
  let queries:MongoQueries = new MongoQueries(db);
  queries.findMany();
});

const port = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, '/../dist')));

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Started from the bottom now we here (${port})`);
});
