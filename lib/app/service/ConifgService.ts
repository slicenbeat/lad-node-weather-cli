import { type FileDriver } from '../../domain/driver/FileDriver'

export interface Config {
  city: string
  token: string
}
const DEFAULT_CITY = 'Samara'
const DEFAULT_TOKEN = 'fc38bce8cac2070342a1b1097f3b67d8'

export class ConfigService {
  private _city!: string
  private _token!: string
  private readonly configPath: string
  constructor (private readonly fileDriver: FileDriver) {
    this.configPath = process.env.CONFIG_PATH ?? 'config.json'
  }

  async load (): Promise<Config> {
    try {
      return await this.tryLoad()
    } catch (error) {
      return {
        city: process.env.CITY ?? DEFAULT_CITY,
        token: process.env.TOKEN ?? DEFAULT_TOKEN
      }
    }
  }

  async tryLoad (): Promise<Config> {
    const file = await this.fileDriver.readFile(this.configPath)
    const parsedConfig: Config = JSON.parse(file.toString())
    return this.mergeConfigOverrides(parsedConfig)
  }

  private mergeConfigOverrides (baseConfig: Config): Config {
    return {
      ...baseConfig,
      ...(this._city ? { city: this._city } : {}),
      ...(this._token ? { token: this._token } : {})
    }
  }

  set token (token: string) {
    this._token = token
  }

  set city (city: string) {
    this._city = city
  }

  async save (config: Config): Promise<void> {
    const stringConfig = JSON.stringify(config)
    await this.fileDriver.writeFile(this.configPath, stringConfig)
  }
}
