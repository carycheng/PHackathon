var BoxSDK = require('box-node-sdk');

// var sdkConfig = require('/Users/sgarlanka/Documents/SDKs/sdk_jwt.json');
// var sdk = BoxSDK.getPreconfiguredInstance(sdkConfig);

// // Get the service account client, used to create and manage app user accounts
// // The enterprise ID is pre-populated by the JSON configuration,
// // so you don't need to specify it here
// var jwtClient = sdk.getAppAuthClient('user', '9817724293');

let sdk = new BoxSDK({
	clientID: '',
	clientSecret: '',
	iterators: true
});

var client = sdk.getBasicClient(token);

exports.generateUser = async (req, res) => {
var folder = await client.folders.getItems('0',
	{
		usemarker: false,
		limit: 10
	});
res.status(200).send(items)

// var login = process.env.login;
// var name = process.env.name;

// var user = await client.enterprise.addUser(
// 	login,
// 	name,
// 	{
// 		role: client.enterprise.userRoles.USER
// 	});
}
