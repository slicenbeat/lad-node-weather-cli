import {
  Command
} from 'commander'
import { type Option, type CLIDriver } from '../../domain/driver/CLIDriver'

export class CommanderCLIDriver
implements CLIDriver {
  private readonly commander: Command
  constructor (params: {
    name: string
    description: string
    version: string
  }) {
    this.commander = new Command()
      .name(params.name)
      .description(params.description)
      .version(params.version)
  }

  addOption (option: Option): CommanderCLIDriver {
    const { flags, description } = option
    this.commander.option(flags, description)
    return this
  }

  showHelp (): void {
    this.commander.help()
  }

  parseArgs (): Record<string, any> {
    this.commander.parse(process.argv)
    return this.commander.opts()
  }
}
