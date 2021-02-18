const http = require('http');
const handles = require('./handles');

const server = http.createServer(handles.serverHandle);
server.listen(8000);
