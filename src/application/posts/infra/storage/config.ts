import path from 'path';
import multer, { StorageEngine } from 'multer';
import crypto from 'crypto';
import * as dotenv from 'dotenv'
dotenv.config()

interface IUploadConfig {
    driver: 's3' | 'disk';
    tmpFolder: string;
    directory: string;
    multer: {
        storage: StorageEngine;
    };
    config: {
        aws: {
            bucket: string;
        };
    };
}

const uploadFolder = path.resolve(__dirname, '..', '..', '..', 'uploads');
const tmpFolder = path.resolve(__dirname, '..', '..', '..', '..', '..', 'temp');

export const uploadConfig = {
    driver: process.env.STORAGE_DRIVER,
    directory: uploadFolder,
    tmpFolder,
    multer: {
        storage: multer.diskStorage({
            destination: tmpFolder,
            filename(request, file, callback) {
                const fileHash = crypto.randomBytes(10).toString('hex');
                const filename = `${fileHash}-${file.originalname}`;

                console.log(tmpFolder)

                callback(null, filename);
            },
        }),
    },
    config: {
        aws: {
            bucket: process.env.BUCKET_NAME,
        },
    },
} as IUploadConfig;
