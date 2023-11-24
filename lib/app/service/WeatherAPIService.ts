import { type RequestDriver } from '../../domain/driver/RequestDriver'
import { type Config } from './ConifgService'

export interface WeatherResponse {
  main: {
    feels_like: number
    temp: number
    temp_max: number
    temp_min: number
  }
  name: string
}
export class WeatherAPIService {
  constructor (private readonly requestDriver: RequestDriver) { }

  async getWeather (config: Config): Promise<WeatherResponse> {
    const requestPath = getPathByConfig(config)
    const weather: WeatherResponse =
      await this.requestDriver.get(requestPath)
    return weather
  }
}
function getPathByConfig (config: Config): string {
  const { city, token } = config
  return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${token}`
}
