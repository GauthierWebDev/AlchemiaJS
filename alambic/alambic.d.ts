type AlambicCommandData = {
  name: string;
  description: string;
  usage: string;
  subcommands: AlambicSubCommandData[];
};

type AlambicSubCommandData = {
  name: string;
  description: string;
  usage: string;
};
