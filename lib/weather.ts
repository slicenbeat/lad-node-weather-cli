#!/usr/bin/env node

import dotenv from 'dotenv'
import { CommanderCLIDriver } from './infrastructure/driver/CommanderCLIDriver'
import { WeatherCLIService } from './app/WeatherCLI'
import { WeatherAPIService } from './app/service/WeatherAPIService'
import { HTTPRequestDriver } from './infrastructure/driver/HTTPRequestDriver'
import { ConfigService } from './app/service/ConifgService'
import { FsFileDriver } from './infrastructure/driver/FsFileDriver'
import { WeatherView } from './app/view/WeatherView'
import { ConsoleLogService } from './app/service/ConsoleLogService'

dotenv.config()
const cliDriver = new CommanderCLIDriver({
  name: 'weather-cli',
  description: 'A simple CLI-command for weather forecast',
  version: '1.0.0'
})
const fileDriver = new FsFileDriver()
const requestDriver = new HTTPRequestDriver()

const weatherAPI = new WeatherAPIService(requestDriver)
const config = new ConfigService(fileDriver)
const view = new WeatherView()
const log = new ConsoleLogService()

const weatherCLI = new WeatherCLIService({
  weatherAPI,
  config,
  view,
  log,
  cliDriver
})

void (async () => {
  try {
    await weatherCLI.start()
  } catch (error) {
    log.log(error as string)
  }
})()
