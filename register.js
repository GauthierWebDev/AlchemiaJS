import { pathToFileURL } from 'node:url';
import { register } from 'node:module';

// ? Remove the register.js file from the process.argv array
// Note: flags aren't includes in process.argv
// Input: node [--flags] register.js <fileToImport>
// Output: node [--flags] <fileToImport>
process.argv = process.argv.filter((_, index) => index !== 1);

// ? Get the file passed as an argument to import
const fileToImport = process.argv[1];

// ? Register the loader.js file as a module loader
register('./loader.js', pathToFileURL('./'));

// ? Import the file passed as an argument
import(`./${fileToImport}`);
