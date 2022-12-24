import { uploadConfig } from './config';
import fs from 'fs';
import path from 'path';

export default class DiskStorageProvider {

  /**
  * Remove the image of Localdisk
  * @param {string} filename - The name of file to delete
  */
  public async deleteFile(filename: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.directory, filename);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}
