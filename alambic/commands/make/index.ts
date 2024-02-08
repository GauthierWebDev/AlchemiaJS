import MakeController from "./MakeController";
import { commands } from "@/alambic/data";
import { Command } from "@/alambic/libs";
import MakeView from "./MakeView";

const { make } = commands;

class MakeCommand extends Command {
  constructor() {
    super(make.name, make.usage, make.description);

    this.action = this.help;

    this.addSubCommand(MakeController, make.subcommands.controller);
    this.addSubCommand(MakeView, make.subcommands.view);
  }
}

export default new MakeCommand();
