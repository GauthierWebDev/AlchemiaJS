import * as commands from "@/alambic/commands";
import type { Command } from "@/alambic/libs";
import { Logger } from "@/utils";

const commandFinder = (commandArg: string): Command => {
  const commandList = Object.values(commands);

  if (commandArg.includes(":")) {
    commandArg = commandArg.split(":")[0];
  }

  const matchingCommands = commandList.filter((command) =>
    command.name.startsWith(commandArg)
  );

  if (matchingCommands.length === 0) {
    Logger.setTitle("🧪 Alambic", "error")
      .addMessage(`Command "${commandArg}" not found`)
      .send();
    process.exit(1);
  }

  if (
    matchingCommands.length > 1 &&
    !matchingCommands.find((command) => command.name === commandArg)
  ) {
    const message = Logger.setTitle("🧪 Alambic", "error");
    const parts = [`Command "${commandArg}" is ambiguous`];

    matchingCommands.forEach((command) => {
      const firstPart = command.name.slice(0, commandArg.length);
      const lastPart = command.name.slice(commandArg.length);

      parts.push(`\n- ${Logger.chalk.bold(firstPart)}`);
      parts.push(`${lastPart}`);
    });

    message.addMessage(...parts).send();
    process.exit(1);
  }

  return (
    matchingCommands.find((command) => command.name === commandArg) ||
    matchingCommands[0]
  );
};

export default commandFinder;
