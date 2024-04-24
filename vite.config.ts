import react from '@vitejs/plugin-react';
import { UserConfig } from 'vite';
import vike from 'vike/plugin';

const config: UserConfig = {
  plugins: [react(), vike()],
  resolve: {
    alias: {
      $: __dirname,
      '#': __dirname + '/server',
      '@': __dirname + '/src',
    },
  },
};

export default config;
