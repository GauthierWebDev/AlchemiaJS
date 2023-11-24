const commands = {
  make: {
    name: "make",
    description: "Make a new file, such as a controller or a model",
    usage: "alambic make:<type> <name>",
    subcommands: {
      controller: {
        name: "controller",
        description: "Make a new controller",
        usage: "alambic make:controller <name>",
      },
      model: {
        name: "model",
        description: "Make a new model",
        usage: "alambic make:model <name>",
      },
    },
  },
};

export default commands;
