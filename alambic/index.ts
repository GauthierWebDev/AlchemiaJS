import { commandFinder } from "@/alambic/functions";
import { Logger } from "@/utils";

const alambic = async (args: string[]) => {
  args = args.map((arg) => arg.trim());
  const command = args[0];

  if (!command || command === "") {
    Logger.setTitle("🧪 Alambic", "error")
      .addMessage("No command specified")
      .send();
    process.exit(1);
  }

  const matchingCommand = commandFinder(command);
  return matchingCommand.exec(args);
};

alambic(process.argv.slice(2));
