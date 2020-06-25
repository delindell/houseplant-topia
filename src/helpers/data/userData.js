import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getUserProfileByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const fbUser = response.data;
      let user = {};
      if (fbUser !== null) {
        Object.keys(fbUser).forEach((fbId) => {
          fbUser[fbId].id = fbId;
          user = fbUser[fbId];
        });
      }
      resolve(user);
    })
    .catch((err) => reject(err));
});

const putProfile = (userId, updatedUser) => axios.put(`${baseUrl}/users/${userId}.json`, updatedUser);

const postUser = (newUser) => axios.post(`${baseUrl}/users.json`, newUser);

export default { getUserProfileByUid, postUser, putProfile };
