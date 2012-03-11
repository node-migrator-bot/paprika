/*
Copyright (c) 2012 Mario Pareja

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
/*

   runcmd(cmd, args, options, callback);
   runcmd(cmd, args, options); // throws on failure
   runcmd(cmd, args, callback);
   runcmd(cmd, args); // throws on failure
   runcmd(cmd, options, callback); // throws on failure
   runcmd(cmd, options); // throws on failure
   runcmd(cmd, callback);
   runcmd(cmd) // throws on failure;

   runShellCmds(cmdAndArgs, options, callback)
   runShellCmds(cmdAndArgs, options) // throws on failure
   runShellCmds(cmdAndArgs, callback)
   runShellCmds(cmdAndArgs) // throws on failure
*/
exports.runcmd = function () {
  processArguments.apply(null, arguments);
};

exports.runcmd.processArguments = processArguments;

function processArguments() {
  var args = {
      args: [],
      options: {}
    },
    params = Array.prototype.slice.call(arguments),
    next = params.shift(),
    i;

  if (typeof next !== 'string') {
    throw new Error('Invalid parameter: cmd.');
  }
  args.cmd = next;

  for (i = 0; i < params.length; i++) {
    next = params[i];
    switch (typeof next) {
    case 'object':
      if (next.shift) {
        args.args = next;
      } else {
        args.options = next;
      }
      break;
    case 'function':
      args.callback = next;
      break;
    case 'string':
      args.args = [next];
      break;
    }
  }

  return args;
}