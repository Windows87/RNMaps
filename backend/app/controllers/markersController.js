const express = require('express');
const mongoose = require('../database');
const markersUtils = require('../utils/markersUtils');

const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;
const Marker = require('../models/Marker');
const createImages = markersUtils.createImages;
const idFormatInvalid = markersUtils.idFormatInvalid;
const imageExtensionIsValid = markersUtils.imageExtensionIsValid;

router.get('/', (req, res) => {
  res.json({ app: 'RNMaps Api', version: '1.0.0' });
});

router.get('/marker/:id', async (req, res) => {
  const { id } = req.params;

  if(idFormatInvalid(id))
  	return res.status(400).json({ error: 'Marker id format Invalid' });

  const _id = ObjectId(id);
  try {
  	const marker = await Marker.findOne({ _id });
  	res.json({ marker });
  } catch(err) {
  	console.log(err);
  	res.status(400).json({ error: 'Error on get Marker' });
  }
});

router.get('/markers/:maxDistanceInMeters/:latitude/:longitude', async (req, res) => {
  const { latitude, longitude, maxDistanceInMeters } = req.params;
  const coordinatesFind = [longitude, latitude];

  try {
  	const markers = await Marker.find({ coordinates: {
      $near: {
      	$geometry: {
      	  type: 'Point',
      	  coordinates: coordinatesFind
      	},
      	$maxDistance: maxDistanceInMeters
      }
  	}});
  	res.json({ markers });
  } catch(err) {
  	console.log(err);
  	res.status(400).json({ error: 'Error on find Markers' });
  }
});

router.post('/create/', async (req, res) => {
  const { name, latitude, longitude } = req.fields;
  const { image } = req.files;

  if(!image)
  	return res.json({ error: 'Missing Image' });

  if(!imageExtensionIsValid(['png', 'jpg', 'jpeg'], image))
    return res.status(400).json({ error: 'Image Extension Invalid' });

  if(!name)
  	return res.status(400).json({ error: 'Missing Name' });

  if(!latitude)
  	return res.status(400).json({ error: 'Missing Latitude' });

  if(!longitude)
  	return res.status(400).json({ error: 'Missing Longitude' });

  if(isNaN(latitude))
  	return res.status(400).json({ error: 'Latitude is not a Number' });

  if(isNaN(longitude))
  	return res.status(400).json({ error: 'Longitude is not a Number' });

  const coordinates = [ longitude, latitude ];

  try {
  	const image_name = await createImages(image);
  	const newMarker = await Marker.create({ image_name, name, coordinates });
  	res.json({ created: true });
  } catch (err) {
  	console.log(err);
  	res.status(400).json({ error: 'Error on create Marker' });
  }
});

router.delete('/delete/', async (req, res) => {
  const { id } = req.fields;

  if(idFormatInvalid(id))
    return res.status(400).json({ error: 'Marker id format Invalid' });

  const _id = ObjectId(id);
  try {
    const marker = await Marker.deleteOne({ _id });
    res.json({ removed: true });
  } catch(err) {
    console.log(err);
    res.status(400).json({ error: 'Error on delete Marker' });
  }
});

module.exports = router;