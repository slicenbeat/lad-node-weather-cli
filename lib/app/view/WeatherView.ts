import { type WeatherResponse } from '../service/WeatherAPIService'
const KELVIN_APPROXIMATION = 273.15
const fromKelvinToCelsius = (kelvin: number): string => (kelvin - KELVIN_APPROXIMATION).toFixed(2)
export class WeatherView {
  render (weather: WeatherResponse): string {
    const {
      temp: actualTemperature,
      feels_like: feelsLike,
      temp_min: minimalTemperature,
      temp_max: maximumTemperature
    } = weather.main
    const weatherDescription =
    `
    Регион: ${weather.name},
    Температура воздуха: ${fromKelvinToCelsius(actualTemperature)} °C
    Ощущается как: ${fromKelvinToCelsius(feelsLike)} °C
    Минимальная температура: ${fromKelvinToCelsius(minimalTemperature)} °C
    Максимальная температура: ${fromKelvinToCelsius(maximumTemperature)} °C`
    return weatherDescription
  }
}
