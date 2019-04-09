const express = require('express');
const router = require('./routes/index.js');
const controller = require('./controllers/index.js');
const bodyParser = require('body-parser')

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize routes
router(app);

app.listen(port, (error) => {
  if (error) { console.log(error); }
  console.log("App running on port: ", port);
});
