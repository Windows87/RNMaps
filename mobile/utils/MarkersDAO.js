import configs from '../config';

const siteUrl = configs.siteUrl;
const apiUrl = siteUrl + '/api';

class MarkersDAO {
  insertMarker(image, name, latitude, longitude) {
  	return new Promise(async (next, reject) => {
  	  const body = new FormData();
  	  body.append('image', image);
  	  body.append('name', name);
  	  body.append('latitude', latitude);
  	  body.append('longitude', longitude);

  	  try {
  	    const call = await fetch(apiUrl + '/create/', {
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
  	  	  body
  	    });
  	    const response = await call.json();

  	    if(response.error)
  	  	  return reject(response.error);

  	  	next();
  	  } catch(err) {
  	  	console.log(err);
  	  	reject(err.message);
  	  }
  	});
  }

  getMarkers(userLatitude, userLongitude) {
  	return new Promise(async (next, reject) => {
  	  try {
  	  	const call = await fetch(apiUrl + '/markers/3000/' + userLatitude + '/' + userLongitude);
  	  	const response = await call.json();

  	  	if(response.error)
  	  	  return reject(response.error);

  	  	next(response.markers);
  	  } catch(err) {
   	  	console.log(err);
  	  	reject('Error on get Markers'); 	  	
  	  }
  	});
  }

  deleteMarker(id) {
    return new Promise(async (next, reject) => {
      const body = new FormData();
      body.append('id', id);

      try {
        const call = await fetch(apiUrl + '/delete/', {
          method: 'delete',
          body         
        });
        const response = await call.json();

        if(response.error)
          return reject(response.error);

        next(response.marker);
      } catch(err) {
        console.log(err);
        reject('Error on delete Marker');
      }
    });
  }
}

export default MarkersDAO;