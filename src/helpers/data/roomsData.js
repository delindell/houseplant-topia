import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getRoomsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/rooms.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const fbRooms = response.data;
      const rooms = [];
      if (fbRooms !== null) {
        Object.keys(fbRooms).forEach((fbId) => {
          fbRooms[fbId].id = fbId;
          rooms.push(fbRooms[fbId]);
        });
      }
      resolve(rooms);
    })
    .catch((err) => reject(err));
});

const getSingleRoom = (roomId) => axios.get(`${baseUrl}/rooms/${roomId}.json`);

export default {
  getRoomsByUid,
  getSingleRoom,
};
