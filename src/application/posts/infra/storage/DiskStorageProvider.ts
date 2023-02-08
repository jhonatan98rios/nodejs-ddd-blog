import { uploadConfig } from './config';
import fs from 'fs';
import path from 'path';
import { AbstractStorageProvider } from '../../domain/providers/AbstractStorageProvider';

export default class DiskStorageProvider implements AbstractStorageProvider {

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
