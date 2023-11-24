export interface FileDriver {
  readFile: (path: string) => Promise<Buffer>
  writeFile: (path: string, data: string) => Promise<void>
}
