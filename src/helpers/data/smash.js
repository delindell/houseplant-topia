import plantsData from './plantsData';
import authData from './authData';
import roomsData from './roomsData';

const getPlantsByRoomId = (roomId) => new Promise((resolve, reject) => {
  plantsData.getPlantsByUid(authData.getUid()).then((plants) => {
    roomsData.getRoomsByUid(authData.getUid()).then((rooms) => {

    })
  })
})
