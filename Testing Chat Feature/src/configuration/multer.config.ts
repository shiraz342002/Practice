import { diskStorage } from 'multer';
import {  join } from 'path';
export const multerOptionsAvatar = {
  storage: diskStorage({
    destination: join('src/Assets/UserAvatar'),
    filename: (req, file, callback) => {
      const filename = file.originalname;
      callback(null, filename);
    },
  }),
};
export const multerOptionsPostImages = {
  storage: diskStorage({
    destination: join('src/Assets/PostImages'),
    filename: (req, file, callback) => {
      const filename = file.originalname;
      callback(null, filename);
    },
  }),
};
