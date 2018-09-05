const mongoose = require('../database');
const Schema = mongoose.Schema;

const Marker = new Schema({
  image_name: { type: String, required: true },
  name: { type: String, required: true },
  coordinates: { type: [Number], required: true }
});

Marker.index({ coordinates: '2dsphere' });
module.exports = mongoose.model('Marker', Marker);