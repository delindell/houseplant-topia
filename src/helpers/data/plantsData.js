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

const getPlantsInRoomByRoomId = (roomId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/plants.json?orderBy="roomId"&equalTo="${roomId}"`)
    .then((response) => {
      const allPlants = response.data;
      const plants = [];
      if (allPlants !== null) {
        Object.keys(allPlants).forEach((fbId) => {
          const newPlant = allPlants[fbId];
          newPlant.id = fbId;
          plants.push(newPlant);
        });
      }
    });
});

const updatePlant = (plantId, updatedPlant) => axios.put(`${baseUrl}/plants/${plantId}.json`, updatedPlant);

const postPlant = (newPlant) => axios.post(`${baseUrl}/plants.json`, newPlant);

const getSinglePlant = (plantId) => axios.get(`${baseUrl}/plants/${plantId}.json`);

const deletePlant = (plantId) => axios.delete(`${baseUrl}/plants/${plantId}.json`);

export default {
  getPlantsByUid,
  getSinglePlant,
  deletePlant,
  getPlantsInRoomByRoomId,
  postPlant,
  updatePlant,
};
