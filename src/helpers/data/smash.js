import plantsData from './plantsData';
import authData from './authData';
import roomsData from './roomsData';

const getPlantsByRoom = () => new Promise((resolve, reject) => {
  plantsData.getPlantsByUid(authData.getUid()).then((plants) => {
    roomsData.getRoomsByUid(authData.getUid()).then((rooms) => {
      const plantsInRoom = [];
      plants.forEach((plant) => {
        const roomWithPlant = { room: {}, ...plant };
        rooms.forEach((room) => {
          const plantInsideRoom = plant.find((x) => x.roomId === room.id);
          roomWithPlant.room = plantInsideRoom;
          plantsInRoom.push(roomWithPlant);
        });
      });
      resolve(plantsInRoom);
      console.log('smash', plantsInRoom);
    });
  }).catch((err) => reject(err));
});

export default { getPlantsByRoom };
