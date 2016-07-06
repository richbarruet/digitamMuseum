var express = require('express');
var Twig = require("twig")
const fs = require('fs');

var app = express();

app.set("twig options", {
    strict_variables: false
});

app.get('/', function(req, res){
  res.render('index.twig', {
  });
});

app.listen(8080);