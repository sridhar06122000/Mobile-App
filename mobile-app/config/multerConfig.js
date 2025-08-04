import multer from 'multer';
import fs from 'fs';
import config from './config.js';

const uploadDir = config?.uploadDir;

// Set up storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs?.existsSync(uploadDir)) {
      fs?.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file?.originalname);
  }
});

const upload = multer({ storage: storage });

export default upload;