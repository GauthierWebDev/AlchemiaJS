export interface AlambicCommandData {
  name: string;
  description: string;
  usage: string;
  subcommands: AlambicSubCommandData[];
}

export interface AlambicSubCommandData {
  name: string;
  description: string;
  usage: string;
}
