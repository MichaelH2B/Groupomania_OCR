const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage(
  {
    destination: "./images/",
    filename: (req, file, callback) => {   
      console.log(req);
      const name = file.originalname.split('.')[0].split(' ').join('_'); 
      const extension = MIME_TYPES[file.mimetype];
      callback(null, name + Date.now() + '.' + extension);
    }
  }
);

module.exports = multer({ storage }).single('file'); 