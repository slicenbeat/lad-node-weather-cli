export interface RequestDriver {
  get: (path: string) => Promise<any>
}
