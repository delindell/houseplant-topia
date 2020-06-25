import plantsData from './plantsData';
import authData from './authData';
import roomsData from './roomsData';

const getPlantsByRoom = () => new Promise((resolve, reject) => {
  plantsData.getPlantsByUid(authData.getUid()).then((plants) => {
    roomsData.getRoomsByUid(authData.getUid()).then((rooms) => {
      const plantsInRoom = [];
      rooms.forEach((room) => {
        const roomWithPlants = { ...room };
        const plantInsideRoom = plants.filter((x) => x.roomId === room.id);
        roomWithPlants.plants = plantInsideRoom;
        plantsInRoom.push(roomWithPlants);
      });
      resolve(plantsInRoom);
    });
  }).catch((err) => reject(err));
});

const getRoomPlantIsIn = () => new Promise((resolve, reject) => {
  plantsData.getPlantsByUid(authData.getUid()).then((plants) => {
    roomsData.getRoomsByUid(authData.getUid()).then((rooms) => {
      const plantWithRoom = [];
      plants.forEach((plant) => {
        const singlePlant = { ...plant };
        const room = rooms.find((x) => x.id === singlePlant.roomId);
        singlePlant.room = room;
        plantWithRoom.push(singlePlant);
      });
      resolve(plantWithRoom);
    });
  }).catch((err) => reject(err));
});

export default { getPlantsByRoom, getRoomPlantIsIn };
