const express = require('express');
const cors = require('cors');
const formidable = require('./app/middlewares/formidable-middleware');

const markersController = require('./app/controllers/markersController');

const app = express();

app.use(cors({ origin: '*' }));
app.use(formidable());
app.use('/api', markersController);
app.use(express.static('public'));

app.listen(3001, () => {
  console.log('Server running on port 3001');
});