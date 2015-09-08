Error.stackTraceLimit = Infinity;
require('reflect-metadata');
// require('angular2/test');
// require('angular2/mock');

var context = require.context('./test', true, /\.spec\.ts/);
context.keys().forEach(context);

