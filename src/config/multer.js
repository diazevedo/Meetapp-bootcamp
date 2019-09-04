import { resolve, extname } from 'path';
import multer from 'multer';
import crypto from 'crypto';

const Multer = {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (error, res) => {
        if (error) return cb(error);

        const cryptoFileName = res.toString('hex') + extname(file.originalname);
        return cb(null, cryptoFileName);
      });
    },
  }),
};

export default Multer;
