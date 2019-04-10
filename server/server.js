// This file is the main server file

const express = require('express');
const router = require('./routes/index.js');
const controller = require('./controllers/index.js');
const bodyParser = require('body-parser')

const app = express();
const port = 8000;

//CORS
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}
app.use(allowCrossDomain);

//body parser to get data from POST requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Initialize routes
router(app);

app.listen(port, (error) => {
  if (error) { console.log(error); }
  console.log("App running on port: ", port);
});
