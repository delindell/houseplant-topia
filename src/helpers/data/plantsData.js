import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getPlantsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/plants.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const fbPlants = response.data;
      const plants = [];
      if (fbPlants !== null) {
        Object.keys(fbPlants).forEach((fbId) => {
          fbPlants[fbId].id = fbId;
          plants.push(fbPlants[fbId]);
        });
      }
      resolve(plants);
    })
    .catch((err) => reject(err));
});

const getSinglePlant = (plantId) => axios.get(`${baseUrl}/plants/${plantId}.json`);

const deletePlant = (plantId) => axios.delete(`${baseUrl}/plants/${plantId}.json`);

export default {
  getPlantsByUid,
  getSinglePlant,
  deletePlant,
};
