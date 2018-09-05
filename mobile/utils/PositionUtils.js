import { AsyncStorage } from 'react-native';

const saveLastPosition = (latitude, longitude) => {
  return new Promise(async (next, reject) => {
    try {
      await AsyncStorage.setItem('lastPositionLatitude', latitude.toString());
      await AsyncStorage.setItem('lastPositionLongitude', longitude.toString());
      next();
    } catch (error) {
      reject(error);
    }
  });
}

const getLastPosition = () => {
  return new Promise(async (next, reject) => {
    try {
      const latitudeString = await AsyncStorage.getItem('lastPositionLatitude');
      const longitudeString = await AsyncStorage.getItem('lastPositionLongitude');

      const latitude = Number(latitudeString);
      const longitude = Number(longitudeString);

      next({ latitude, longitude });
    } catch (error) {
      reject(error);
    } 	
  });
}

export { saveLastPosition, getLastPosition };