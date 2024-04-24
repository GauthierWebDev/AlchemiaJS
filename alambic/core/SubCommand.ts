import type { AlambicSubCommandData } from '$/types';

import { Logger } from '$/utils';

class SubCommand {
  public description: string;
  public command: string;
  public usage: string;
  public name: string;

  constructor(subCommandData: AlambicSubCommandData, command: string) {
    this.name = subCommandData.name;
    this.description = subCommandData.description;
    this.usage = subCommandData.usage;
    this.command = command;
  }

  public action(_args: string[]): void {
    Logger.setTitle('🧪 Alambic', 'error')
      .addMessage(`Command "${this.command}:${this.name}" action not implemented yet.`)
      .send();

    process.exit(0);
  }

  public help(): void {
    Logger.setTitle('🧪 Alambic', 'info')
      .addMessage(Logger.chalk.green('Command:') + `\n-> ${this.command}:${this.name}`)
      .addMessage(Logger.chalk.green('Description:') + `\n-> ${this.description}`)
      .addMessage(Logger.chalk.green('Usage:') + `\n-> ${this.usage}`)
      .send();

    process.exit(0);
  }
}

export default SubCommand;
