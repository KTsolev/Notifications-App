'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

const port = process.env.PORT || 8060;

mongoose.connect('mongodb://localhost/notifications');

const Controller = require('./Controller/Notifications.js');

const router = express.Router();

router.get('/', function (req, res) {
  console.log({ message: 'hooray! welcome to our api!' });
  res.json({ message: 'hooray! welcome to our api!' });
});

router.get('/notifications', Controller.findAll);

router.post('/notifications/add-new', Controller.save);

router.put('/notifications/update', Controller.update);

router.delete('/notifications/delete:id', Controller.delete);

app.on('error', function (err) {
  console.error(err);
});

app.use(function (req, res, next) {
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log('===========================');
  console.log(`||Client IP| ${ip} |Port: ${port}||`);
  console.log('===========================');
  next();
});

app.use('/api', router);
app.listen(port);
console.log('==========================================================');
console.log(`||Beers are served at: http://localhost: ${port || app.settings.env}||`);
console.log('==========================================================');
