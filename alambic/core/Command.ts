import type { AlambicSubCommandData } from '$/types';

import { subCommandFinder } from '$/alambic/functions';
import { SubCommand } from '$/alambic/core';
import { Logger } from '$/utils';

class Command {
  public subcommands: SubCommand[] = [];
  public description: string;
  public usage: string;
  public name: string;

  constructor(name: string, usage: string, description: string) {
    this.description = description;
    this.usage = usage;
    this.name = name;
  }

  protected addSubCommand(SubCommandClass: typeof SubCommand, subCommandData: AlambicSubCommandData): void {
    this.subcommands.push(new SubCommandClass(subCommandData, this.name));
  }

  protected action(args: string[]): void {
    Logger.setTitle('🧪 Alambic', 'error')
      .addMessage(`Command "${this.name}" action not implemented yet.`)
      .send();
    process.exit(0);
  }

  public help(): void {
    Logger.setTitle('🧪 Alambic', 'info')
      .addMessage(`Command: ${this.name}`)
      .addMessage(`Description: ${this.description}`)
      .addMessage(`Usage: ${this.usage}`)
      .send();
    process.exit(0);
  }

  public exec(args: string[]): void {
    if (args[0].includes(':')) {
      const subcommandName = args[0].split(':')[1];

      const matchingSubCommand = subCommandFinder(subcommandName, this);

      if (['-h', '--help'].includes(args[1])) {
        matchingSubCommand.help();
        return;
      }

      matchingSubCommand.action(args.slice(1));
      return;
    }

    if (['-h', '--help'].includes(args[1])) {
      this.help();
      return;
    }

    this.action(args.slice(1));
  }
}

export default Command;
