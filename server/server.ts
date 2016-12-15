import * as express from 'express';
import * as bodyParser from 'body-parser';
import {MongooseConnection} from './db/mongoose';
import * as path from 'path';

let connection: MongooseConnection = new MongooseConnection();
connection.connect();

const citationRoutes = require('./routes/citations');
const userRoutes = require('./routes/users');

const port = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, '/../app')));

app.use(bodyParser.json());

app.use('/citations', citationRoutes);
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Started from the bottom now we here (${port})`);
});
