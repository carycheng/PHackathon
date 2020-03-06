var BoxSDK = require('box-node-sdk');
var objectPath = require("object-path");

// var sdkConfig = require('/Users/sgarlanka/Documents/SDKs/sdk_jwt.json');
// var sdk = BoxSDK.getPreconfiguredInstance(sdkConfig);

// // Get the service account client, used to create and manage app user accounts
// // The enterprise ID is pre-populated by the JSON configuration,
// // so you don't need to specify it here
// var jwtClient = sdk.getAppAuthClient('user', '9817724293');

let sdk = new BoxSDK({
	clientID: '',
	clientSecret: '',
	iterators: false
});

var token = process.env.token;
// var token = "H4RrOLZICfgnI5uXJ0EoZmDQEucyZMC8";
var client = sdk.getBasicClient(token);

exports.generateUser = async (req, res) => {
	console.log("Received a request");
	if (req.method === "GET") {
	  var verification = req.get("X-Okta-Verification-Challenge");
		 var resBody = {"verification":verification }
		res.status(200).send(resBody);     
	} else {
		console.log("Processing request for user ");
		// console.log(req.body.data.events[0].target[0].displayName);
		// console.log(req.body.data.events[0].target[0].alternateId);
		console.log(req);
		var name = objectPath.get(req, process.env.name);
		var id = objectPath.get(req, process.env.id);
		console.log(name);
		console.log(id);

		client.asSelf();
		var user = await client.enterprise.addUser(id, name, {
			'is_platform_access_only': true
		});
		console.log(user);
		await createFolderStucture('50167809963', '0', user.id);
		res.status(200).send();
	}
}

async function createFolderStucture(serviceFolderId, userParentFolderId, userId) {
	client.asSelf();
	var serviceAccountFolders = await client.folders.getItems(serviceFolderId);
	for (let serviceAccountFolder of serviceAccountFolders.entries){
		if (serviceAccountFolder.type == 'folder'){
			client.asUser(userId);
			var createdUserFolder = await client.folders.create(userParentFolderId, serviceAccountFolder.name);
			console.log(createdUserFolder.name)
			await createFolderStucture(serviceAccountFolder.id, createdUserFolder.id, userId);
		}
	}
	return;
}

// test();
// async function test() {
// 	var login = "sgarlanka+test123@boxdemo.com";
// 	var name = "test";
// 	var user = await client.enterprise.addUser(login, name, {
// 		'is_platform_access_only': true
// 	});
// 	await createFolderStucture('0', '0', user.id);
// 	client.asUser(user.id);
// 	var userFolders = await client.folders.getItems('0');
// 	console.log(userFolders);
// }