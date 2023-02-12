export abstract class AbstractStorageProvider {
    abstract deleteFile(filename: string): Promise<void>
}

export abstract class AbstractCloudStorageProvider extends AbstractStorageProvider {
    abstract imageUpload(filename: string, body: Buffer): Promise<void> 
}
