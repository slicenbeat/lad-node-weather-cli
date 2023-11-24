import { type FileDriver } from '../../domain/driver/FileDriver'
import * as fs from 'fs'
export class FsFileDriver implements FileDriver {
  async writeFile (path: string, data: string): Promise<void> {
    await fs.promises.writeFile(path, data)
  }

  async readFile (path: string): Promise<Buffer> {
    const file = await fs.promises.readFile(path)
    return file
  }
}
