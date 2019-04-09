const fetch = require('node-fetch');
const launchLibraryUrl = 'https://launchlibrary.net';

var fetchLaunch = ((req, res, num, resolve, reject) => {

  fetch(launchLibraryUrl + '/1.4/launch/next/' + num.toString())
    .then(launchString => launchString.json())
    .then(launchData => {
      resolve(launchData);
    })
    .catch(error => {
      reject(new Error("Calling " + launchLibraryUrl + " resulted in " + error));
    });
});

module.exports = fetchLaunch;
