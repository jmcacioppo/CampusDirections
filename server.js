var express = require('express');
var path = require('path');
var app = express();
var rootPath = path.normalize(__dirname);

app.use(express.static(rootPath));
app.listen(3000);
console.log("Listening at localhost:3000...");