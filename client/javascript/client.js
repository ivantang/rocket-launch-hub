
const expressServerURL = 'http://localhost:8000/launch?next=100';

main();

function main() {
  getLaunchData();
}

function getLaunchData() {
  const myPromise = new Promise((resolve, reject) => {
    fetch(expressServerURL)
      .then((launchString) => launchString.json())
      .then((launchData) => {
        resolve(launchData);
      })
      .catch(error => {
        reject(new Error("Fetching data from " + expressServerURL + " resulted in " + error));
      });

  });

  myPromise.then((launchData) => {
    console.log(launchData);
    console.log(filterBy(launchData.launches, 'Russia'));
    //populateArticleDom(filterBy(launchData.launches, 'USA'))
  });
}

function populateArticleDom(launches)  {
  launches.forEach((launch) => {
      console.log(launch);
  })
}

function filterBy(launches, filterType) {
  switch(filterType) {
    case 'Confirmed':
      return launches.filter((launch) => {
        if (launch.probability > 0) return launch;
      })
      break;
    case 'USA':
      return launches.filter((launch) => {
        if (launch.location.countryCode === 'USA') return launch;
      })
      break;
    case 'Russia':
      return launches.filter((launch) => {
        if (launch.location.countryCode === 'Russia') return launch;
      })
      break;
    case 'SpaceX':
      return launches.filter((launch) => {
        if (launch.lsp.name === 'SpaceX') return launch;
      })
      break;
  }


}
