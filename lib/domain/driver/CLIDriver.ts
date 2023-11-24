export interface Option {
  flags: string
  description?: string
}

export interface CLIDriver {
  addOption: (option: Option) => CLIDriver
  parseArgs: () => Record<string, any>
  showHelp: () => void
}
