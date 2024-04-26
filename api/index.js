const cors = require('cors');
const bodyParser = require('body-parser')
const express = require('express');
const router = require('./routes/index.js');

const app = express();

app.set('port', (process.env.PORT || 8081));

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(router);

app.listen(app.get('port'), function() {
  console.log('Api running on port', app.get('port'));
});

module.exports = app;