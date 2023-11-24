import { type CLIDriver } from '../domain/driver/CLIDriver'
import { type LogService } from '../domain/service/LogService'
import { type Config, type ConfigService } from './service/ConifgService'
import { type WeatherAPIService } from './service/WeatherAPIService'
import { type WeatherView } from './view/WeatherView'
const DEFAULT_MESSAGE_ON_ERROR = 'Произошла непредвиденная ошибка. Повторите попытку позже.'
interface CLIOptions extends Config {
  help?: string
}
export class WeatherCLIService {
  constructor (private readonly params: {
    weatherAPI: WeatherAPIService
    config: ConfigService
    log: LogService
    cliDriver: CLIDriver
    view: WeatherView
  }) { }

  async start (): Promise<void> {
    try {
      await this.tryStart()
    } catch (error) {
      this.params.log.log(DEFAULT_MESSAGE_ON_ERROR)
    }
  }

  private async tryStart (): Promise<void> {
    const cliOptions = this.parseCLIOptions()
    await this.processCLIOptions(cliOptions)
  }

  private parseCLIOptions (): CLIOptions {
    this.params.cliDriver
      .addOption({
        flags: '-s, --city <city>',
        description: 'Specify the city'
      })
      .addOption({
        flags: '-t, --token <token>',
        description: 'Specify the API token'
      })
      .addOption({
        flags: '-h, --help',
        description: 'Display help information'
      })
    return this.params.cliDriver.parseArgs() as CLIOptions
  }

  private async processCLIOptions (cliOptions: CLIOptions): Promise<void> {
    const { city, token, help } = cliOptions
    if (city) {
      this.params.config.city = city
    }
    if (token) {
      this.params.config.token = token
    }
    if (help) {
      this.showHelp()
      return
    }
    await this.showWeather()
  }

  private showHelp (): void {
    this.params.cliDriver.showHelp()
  }

  private async showWeather (): Promise<void> {
    const config = await this.params.config.load()
    const weather = await this.params.weatherAPI.getWeather(config)
    const view = this.params.view.render(weather)
    this.params.log.log(view)
  }
}
