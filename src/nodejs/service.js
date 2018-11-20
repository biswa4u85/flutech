var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');

app.use(allowCrossDomain);
var bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));

app.all('/flutech-health', function (req, res) {
res.body =  "flutech is running ";
  res.status(200).send(res.body);
});

app.post('/addDepartment',function(req, res){
    var request = require('sync-request');
    var url = 'http://flutech.hisigntech.com:81/api/Accounts/AddDepartment';
	var requestData = {DepartmentName:req.body.DepartmentName,HodId:req.body.HodId};

    console.log('httpApicaller');
    var response = request('POST', url, {
        json: requestData,
    });
    var resJson = JSON.parse(response.getBody('utf8'));
    res.status(200).send(resJson);

});

function fetchDocument(url) {
    var request = require('sync-request');
	var requestData = {DepartmentName:'xyz',HodId:'132'};

    console.log('httpApicaller');
    var response = request('POST', url, {
        json: requestData,
    });
    var resJson = JSON.parse(response.getBody('utf8'));
    console.log(resJson);
    return resJson;
}

var port = 3001;
app.set('view engine', 'ejs');

app.listen(port, function () {
    console.log( 'AMP POC app listening on port ' + port);
});

function allowCrossDomain(req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    if (req.method === 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
}