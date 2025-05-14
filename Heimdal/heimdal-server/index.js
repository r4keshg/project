const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const routes = require('./routes');

const app = express();

app.use(session({
  secret: 'heimdal_secret_key',
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));
app.use('/', routes);

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
