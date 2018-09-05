const sharp = require('sharp');

const getExtension = (image) => {
  return image.name.slice(image.name.lastIndexOf('.') + 1);
}

const imageExtensionIsValid = (extensions, image) => {
  return extensions.indexOf(getExtension(image)) !== -1;
}

const idFormatInvalid = (id) => {
  return id.length !== 12 && id.length !== 24;
}

const generateImageFilename = (image) => {
  const date = new Date();
  const dateTime = date.getTime();
  const extension = getExtension(image);
  return dateTime + '_' + Math.round(Math.random() * dateTime) + '.' + extension;
}

const createImages = (image) => {
  return new Promise(async (next, reject) => {
  	const newImageFile = generateImageFilename(image);
  	const imageExtension = getExtension(image);

  	try {
  	  switch(imageExtension) {
  	  	case 'png':
  	      await sharp(image.path).resize(64, 64).png({ compressionLevel: 9 }).toFile('./public/markers/' + newImageFile);
          await sharp(image.path).resize(500, 500).png({ compressionLevel: 8 }).toFile('./public/images/' + newImageFile);
  	      break;
  	    default:
  	      await sharp(image.path).resize(64, 64).jpeg({ quality: 100 }).toFile('./public/markers/' + newImageFile);
          await sharp(image.path).resize(500, 500).jpeg({ compressionLevel: 80 }).toFile('./public/images/' + newImageFile);  	    
  	  }

  	  next(newImageFile);
    } catch(err) {
      console.log(err);
      reject(err);
    }
  });
}

module.exports = { imageExtensionIsValid, idFormatInvalid, createImages };