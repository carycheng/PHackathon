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

var token = process.env.token;
var client = sdk.getBasicClient(token);

exports.generateUser =(req, res) => {
	client.folders.getItems('0',
	{
		usemarker: false,
		limit: 10
	}).then(items => {
		console.log(items)
		res.status(200).send(items)
	});
}

// var login = process.env.login;
// var name = process.env.name;

// client.enterprise.addUser(
// 	login,
// 	name,
// 	{
// 		role: client.enterprise.userRoles.CO,
// 		status: client.enterprise.userStatuses.CANNOT_DELETE_OR_EDIT
// 	})
// 	.then(user => {
// 		/* user -> {
// 			type: 'user',
// 			id: '44444',
// 			name: 'Ned Stark',
// 			login: 'eddard@winterfell.example.com',
// 			created_at: '2012-11-15T16:34:28-08:00',
// 			modified_at: '2012-11-15T16:34:29-08:00',
// 			role: 'coadmin',
// 			language: 'en',
// 			timezone: 'America/Los_Angeles',
// 			space_amount: 5368709120,
// 			space_used: 0,
// 			max_upload_size: 2147483648,
// 			status: 'active',
// 			job_title: '',
// 			phone: '',
// 			address: '555 Box Lane',
// 			avatar_url: 'https://www.box.com/api/avatar/large/deprecated' }
//         */
// 	});
