var request = require('sync-request');

const g_playablo_api_endpoint = 'http://flutech.hisigntech.com:81/';


	var tokenApiPath = g_playablo_api_endpoint + 'api/Accounts/GetUserTypes';
	var requestData = {DepartmentName:'xyz',HodId:'132'};
	
var userObj = httpApicaller(tokenApiPath, requestData);

console.log("userObj", userObj);

function httpApicaller(path, PostRequest) {
	console.log('httpApicaller');
	var response = request('POST', path, {
		json: PostRequest,
	});
	var resJson = JSON.parse(response.getBody('utf8'));
	console.log(resJson);
	return resJson;
};