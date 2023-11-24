import MakeController from "./MakeController";
import { commands } from "@/alambic/data";
import { Command } from "@/alambic/libs";

const { make } = commands;

class MakeCommand extends Command {
  constructor() {
    super(make.name, make.usage, make.description);

    this.addSubCommand(MakeController, make.subcommands.controller);
  }
}

export default new MakeCommand();
