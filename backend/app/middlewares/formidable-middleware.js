const formidable = require('formidable');

const formidableMiddleware = (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    Object.assign(req, {fields, files});
    next();
  });
}

module.exports = () => formidableMiddleware;