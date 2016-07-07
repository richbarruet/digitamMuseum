var express     = require('express');
var Twig        = require("twig");
var fs          = require('fs');

var app         = express();

ipaddress  = process.env.OPENSHIFT_NODEJS_IP ||  process.env.OPENSHIFT_INTERNAL_IP;
port       = process.env.OPENSHIFT_INTERNAL_PORT || process.env.OPENSHIFT_NODEJS_PORT || 8091;

if (typeof ipaddress == "undefined") {
     //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
     //  allows us to run/test the app locally.
     console.warn('No OPENSHIFT_*_IP var, using 127.0.0.1');
     ipaddress = "127.0.0.1";
};

// Add headers
/*app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});*/

app.set("twig options", {
    strict_variables: false
});
/*
app.get('/', function(req, res){
    res.redirect("/android");
});
*/
app.get('/:platform', function(req, res){
    var platform = req.params.platform;
    
    /*
    var contents = fs.readFileSync("ressources/versions.json");
    var jsonContent = JSON.parse(contents,null,2); 
    var apps = jsonContent.apps;
    */

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

app.listen(port,ipaddress);