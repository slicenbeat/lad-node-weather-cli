import { type RequestDriver } from '../../domain/driver/RequestDriver'
import * as https from 'https'
export class HTTPRequestDriver implements RequestDriver {
  async get (path: string): Promise<any> {
    return await new Promise((resolve, reject) => {
      https.get(path, (response) => {
        const data: string[] = []
        response.on('data', chunk => {
          data.push(chunk)
        })
        response.on('end', () => {
          const parsedData = JSON.parse(data.join(''))
          resolve(parsedData)
        })
        response.on('error', error => {
          reject(error)
        })
      })
    })
  }
}
