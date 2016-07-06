var express = require('express');
var Twig = require("twig")
const fs = require('fs');

var app = express();

var self = this;

self.ipaddress  = process.env.OPENSHIFT_NODEJS_IP ||  process.env.OPENSHIFT_INTERNAL_IP;
self.port       = process.env.OPENSHIFT_INTERNAL_PORT || process.env.OPENSHIFT_NODEJS_PORT || 8091;

if (typeof self.ipaddress === "undefined") {
     //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
     //  allows us to run/test the app locally.
     console.warn('No OPENSHIFT_*_IP var, using 127.0.0.1');
     self.ipaddress = "127.0.0.1";
};

app.set("twig options", {
    strict_variables: false
});

app.get('/', function(req, res){
  res.render('index.twig', {
  });
});

app.listen(self.port,self.ipaddress);