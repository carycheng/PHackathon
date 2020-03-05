var BoxSDK = require('box-node-sdk');

let sdk = new BoxSDK({
	clientID: '',
	clientSecret: '',
	iterators: true
});

var token = process.env.token;
var client = sdk.getBasicClient(token);

// var sdkConfig = require('/Users/sgarlanka/Documents/SDKs/sdk_jwt.json');
// var sdk = BoxSDK.getPreconfiguredInstance(sdkConfig);

// // Get the service account client, used to create and manage app user accounts
// // The enterprise ID is pre-populated by the JSON configuration,
// // so you don't need to specify it here
// var jwtClient = sdk.getAppAuthClient('user', '9817724293');

client.folders.getItems('0',
	{
		usemarker: false,
		limit: 10
	}).then(items => {
		console.log(items)
	});

