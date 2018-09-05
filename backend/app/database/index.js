const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/rnmaps', { useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);

module.exports = mongoose;