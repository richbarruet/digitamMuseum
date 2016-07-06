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

app.get('/:platform', function(req, res){
    var platform = req.params.platform;
    
    var contents = fs.readFileSync("ressources/versions.json");
    var jsonContent = JSON.parse(contents,null,2); 
    var apps = jsonContent.apps;

    var application = undefined;
    for (app of apps){
        if(platform == app.platform){
            application = app; 
        }
    }
    if(application == undefined){
        res.json({
            "error"     : "Plateforme incorrecte"
        });
    }else{
        res.json(application);
    }
});

app.listen(self.port,self.ipaddress);