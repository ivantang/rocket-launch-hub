
const expressServerURL = 'http://localhost:8000/launch?next=100';

main();

/*
* Main function of application
*
*
*/
function main() {
  const myPromise = new Promise((resolve, reject) => {
    let launchData = getLaunchData(resolve, reject);
  });

  myPromise.then((launchData) => {
    console.log(launchData);
    populateArticleDom(launchData.launches);
    addFilterButtonsListeners(launchData.launches);
  });

}


/*
* Add click listeners to filter buttons
*
*/
function addFilterButtonsListeners(launches){
  let buttons = document.getElementsByClassName("filter-buttons")[0].childNodes;

  buttons.forEach((button) => {
    if(button.nodeName == "BUTTON") {
      button.addEventListener("click", () => {
        populateArticleDom(filterBy(launches, button.innerHTML));
      });
    }
  });
}

/*
* Calls http://localhost:8000 express API to get Launch data
*
* @params resolve parameter from Promise
*         reject parameter from Promise
*
*/
function getLaunchData(resolve, reject) {
  fetch(expressServerURL)
    .then((launchString) => launchString.json())
    .then((launchData) => {
      resolve(launchData);
    })
    .catch(error => {
      reject(new Error("Fetching data from " + expressServerURL + " resulted in " + error));
    });
}


/*
* Add all launch objects to the DOM
*
* @params object[] array of launch objects
*
*/
function populateArticleDom(launches)  {
  //get parent
  let newArticle = document.getElementsByClassName("launches")[0];

  //first delete all child nodes of article
  newArticle.childNodes.forEach((section) => {
    section.remove();
  });


  //add launch elements
  launches.forEach((launch) => {
      //console.log(launch);

      //create section
      let newSection = document.createElement('section');
      newSection.id = launch.id;
      newSection.className = 'launch';
      newArticle.appendChild(newSection);

      //create headers
      let rocketName = document.createElement('h2');
      rocketName.innerHTML = launch.rocket.name;
      rocketName.className = 'rocket'
      newSection.appendChild(rocketName);

      let agencyName = document.createElement('h2');
      agencyName.innerHTML = launch.lsp.name;
      agencyName.className = 'agency'
      newSection.appendChild(agencyName);

      //create p elements
      let location = document.createElement('p');
      let locationUrl = document.createElement('a')
      locationUrl.href = launch.location.pads[0].mapURL;
      locationUrl.target = '_blank';
      locationUrl.innerHTML = launch.location.name;
      location.appendChild(locationUrl);
      newSection.appendChild(location);

      let date = document.createElement('p')
      date.innerHTML = launch.net;
      newSection.appendChild(date);

      //image
      let rocketImage = document.createElement('img');

      //get smaller size image
      let rocketImageUrl = launch.rocket.imageURL.split('.');
      if(rocketImageUrl[rocketImageUrl.length - 1] === 'jpg') {

        rocketImageUrl = rocketImageUrl.join('.');
        rocketImageUrl = rocketImageUrl.split('_');
        rocketImageUrl[rocketImageUrl.length-1] = launch.rocket.imageSizes[0] +'.jpg';
        rocketImageUrl = rocketImageUrl.join('_');

        //set source and add to DOM
        rocketImage.src = rocketImageUrl;
        newSection.appendChild(rocketImage);
      } else if (rocketImageUrl[rocketImageUrl.length - 1] === 'png') {

        rocketImageUrl = rocketImageUrl.join('.');
        rocketImageUrl = rocketImageUrl.split('_');
        rocketImageUrl[rocketImageUrl.length-1] = launch.rocket.imageSizes[0] +'.png';
        rocketImageUrl = rocketImageUrl.join('_');

        //set source and add to DOM
        rocketImage.src = rocketImageUrl;
        newSection.appendChild(rocketImage);
      } else {
        //Let's not load an image if image is not jpg or png
      }
  })
}



/*
* Filter array of Launch objects based on a filter type
*
* @params object[] array of launch objects
*         string type of filter (Confirmed, USA, Russia, SpaceX)
* @returns object[] array of filter launch objects
*/
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
