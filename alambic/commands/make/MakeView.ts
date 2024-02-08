import { SubCommand } from "@/alambic/libs";
import { Logger } from "@/utils";
import fs from "fs";

class MakeViewSubCommand extends SubCommand {
  constructor(subcommandData: AlambicSubCommandData, command: string) {
    super(subcommandData, command);
  }

  private doesViewExist(viewName: string): boolean {
    const viewPath = `views/pages/${viewName}.njk`;
    return fs.existsSync(viewPath);
  }

  private replaceTemplateVariables(viewName: string): string {
    return fs
      .readFileSync("alambic/templates/View.template", "utf-8")
      .replace(/\$1/g, viewName);
  }

  private writeView(viewName: string): void {
    const viewPath = `views/pages/${viewName}.njk`;
    const viewTemplate = this.replaceTemplateVariables(viewName);
    fs.writeFileSync(viewPath, viewTemplate);
  }

  private filterViewName(viewName: string): string {
    return viewName
      .replace(/[^a-zA-Z]/g, " ")
      .replace(/\s+/g, " ")
      .replace(/\s/g, "-");
  }

  public action(args: string[]): void {
    let [viewName] = args;

    if (!viewName) {
      Logger.setTitle("🧪 Alambic", "error")
        .addMessage(`Missing view name`)
        .send();
      process.exit(1);
    }

    viewName = this.filterViewName(viewName);

    if (this.doesViewExist(viewName)) {
      Logger.setTitle("🧪 Alambic", "error")
        .addMessage(`View "${viewName}" already exists`)
        .send();
      process.exit(1);
    }

    this.writeView(viewName);

    Logger.setTitle("🧪 Alambic", "success")
      .addMessage(`View "${viewName}" created successfully!`)
      .send();
  }
}

export default MakeViewSubCommand;
