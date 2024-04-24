const commands = {
  make: {
    name: 'make',
    description: 'Make a new file, such as a controller or a view',
    usage: 'alambic make:<type> <name>',
    subcommands: {
      controller: {
        name: 'controller',
        description: 'Make a new controller',
        usage: 'alambic make:controller <name>',
      },
    },
  },
};

export default commands;
