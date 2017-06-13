"use strict";
var fs        = require("fs");
var path      = require("path");

var express = require('express');
var router = express.Router();
fs.readdirSync(__dirname+"/api")
  .filter(function(file) {
    return (file.indexOf(".") !== 0);
  })
  .forEach(function(file) {
      var routeName =file.replace('api_','').replace('.js','');
      console.log(routeName);
      var apiModule = require(__dirname+"/api/"+file);
      console.log(__dirname+"/api/"+file);
      router.use('/'+routeName,apiModule);
  });
  
module.exports = router;