//routers
const fetchLaunch = require('../controllers/index.js');

var router = ((app) => {

  app.get('/', (req, res) => {
    res.status(200).send('GET request to /');
  });

  app.get('/launch', (req, res) => {

    const myPromise = new Promise((resolve, reject) => {
      const launchData = fetchLaunch(req, res, resolve, reject);
    })

    myPromise.then((launchData) => {
      res.send(launchData)
    }, (error) => {
      console.log(error);
    });

  });

});

module.exports = router;
