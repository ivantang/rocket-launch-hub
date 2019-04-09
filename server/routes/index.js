//routers
const fetchLaunch = require('../controllers/index.js');

var router = ((app) => {

  app.get('/', (req, res) => {
    res.status(200).send('GET request to /');
  });

  app.get('/launch', (req, res) => {

    // make sure query is a number
    let num = parseInt(req.query.next, 10);
    if((!num) || (num < 1) || (typeof num) !== "number") num = 1;

    const myPromise = new Promise((resolve, reject) => {
      const launchData = fetchLaunch(req, res, num, resolve, reject);
    })

    myPromise.then((launchData) => {
      res.send(launchData)
    }, (error) => {
      console.log(error);
    });

  });

});

module.exports = router;
