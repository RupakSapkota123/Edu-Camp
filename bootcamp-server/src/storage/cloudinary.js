import { config } from '../config/index.js';
import { v2 as cloudinaryV2 } from 'cloudinary';
import Multer from 'multer';

cloudinaryV2.config(config.cloudinary);

export const multer = Multer({
  dest: 'uploads/',
  limits: {
    fileSize: 2 * 1024 * 1024, //* no longer than 2mb
  },
});

export const uploadImageToStorage = (file, folder) => {
  if (file) {
    return new Promise(async (resolve, reject) => {
      const opts = {
        folder,
        resource_type: 'auto',
        overwrite: true,
        quality: 'auto',
      };

      if (Array.isArray(file)) {
        const req = file.map((img) => {
          return cloudinaryV2.uploader.upload(img.path, opts);
        });

        try {
          const result = await Promise.all(req);
          resolve(result);
        } catch (err) {
          reject(err);
        }
      } else {
        try {
          const result = await cloudinaryV2.uploader.upload(file.path, opts);
          resolve(result);
        } catch (err) {
          reject(err);
        }
      }
    });
  }
};

export const deleteImageFromStorage = (publicID) => {
  if (publicID) {
    return new Promise(async (resolve, reject) => {
      if (Array.isArray(publicID)) {
        try {
          await cloudinaryV2.api.delete_resources(publicID);
          resolve({ state: true });
        } catch (err) {
          reject(err);
        }
      } else {
        try {
          await cloudinaryV2.uploader.destroy(publicID, { invalidate: true });
          resolve({ state: true });
        } catch (err) {
          reject(err);
        }
      }
    });
  }
};
