import { type LogService } from '../../domain/service/LogService'

export class ConsoleLogService implements LogService {
  log (message: string): void {
    console.log(message)
  }
}
