import axios from 'axios';

import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getWateringsByPlantId = (plantId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/waterings.json?orderBy="plantId"&equalTo="${plantId}"`)
    .then((response) => {
      const fbWaterings = response.data;
      const waterings = [];
      if (fbWaterings !== null) {
        Object.keys(fbWaterings).forEach((fbId) => {
          fbWaterings[fbId].id = fbId;
          waterings.push(fbWaterings[fbId]);
        });
      }
      resolve(waterings);
    })
    .catch((err) => reject(err));
});

const addNewWatering = (newWatering) => axios.post(`${baseUrl}/waterings.json`, newWatering);

export default { addNewWatering, getWateringsByPlantId };
