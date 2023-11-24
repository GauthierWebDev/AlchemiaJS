import type { SubCommand, Command } from "@/alambic/libs";
import { Logger } from "@/utils";

const subCommandFinder = (commandArg: string, command: Command): SubCommand => {
  const matchingSubCommands = command.subcommands.filter((subCommand) => {
    return subCommand.name.startsWith(commandArg);
  });

  if (matchingSubCommands.length === 0) {
    Logger.setTitle("🧪 Alambic", "error")
      .addMessage(`Command "${command.name}:${commandArg}" not found`)
      .send();
    process.exit(1);
  }

  const fullCommandArg = `${command.name}:${commandArg}`;

  if (
    matchingSubCommands.length > 1 &&
    !matchingSubCommands.find(
      (subCommand) => subCommand.name === fullCommandArg
    )
  ) {
    const fullCommandArg = `${command.name}:${commandArg}`;

    const message = Logger.setTitle("🧪 Alambic", "error");
    const parts = [`Command "${command.name}:${commandArg}" is ambiguous`];

    matchingSubCommands.forEach((subcommand) => {
      const fullCommand = `${command.name}:${subcommand.name}`;
      const firstPart = fullCommand.slice(0, fullCommandArg.length);
      const lastPart = fullCommand.slice(fullCommandArg.length);

      const parts = ["\n- "];
      parts.push(Logger.chalk.bold(firstPart));
      parts.push(lastPart);
    });

    message.addMessage(...parts).send();
    process.exit(1);
  }

  return (
    matchingSubCommands.find(
      (subCommand) => subCommand.name === fullCommandArg
    ) || matchingSubCommands[0]
  );
};

export default subCommandFinder;
