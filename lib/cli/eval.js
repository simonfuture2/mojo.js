'use strict';

export default function evalCommand (app) {
  // eslint-disable-next-line no-eval
  console.log(eval(process.argv[3]));
}
evalCommand.description = 'Run code against application';
evalCommand.usage = `Usage: APPLICATION eval [OPTIONS] CODE

  ./myapp.js eval '1 + 1'

Options:
  -h, --help   Show this summary of available options
`;