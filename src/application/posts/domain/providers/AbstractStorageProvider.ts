export abstract class AbstractStorageProvider {
    abstract deleteFile(filename: string): Promise<void>
}

export abstract class AbstractCloudStorageProvider<T> extends AbstractStorageProvider {
    abstract client: T
    abstract imageUpload(filename: string, body: Buffer): Promise<void> 
}
