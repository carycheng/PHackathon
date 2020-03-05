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
// var token = "3B3kI172SunzBn43hOE8EdtKVkMIiAxF";
var client = sdk.getBasicClient(token);

// test();

exports.generateUser = async (req, res) => {
	console.log("Received a request");
	if (req.method === "GET") {
	  var verification = req.get("X-Okta-Verification-Challenge");
		 var resBody = {"verification":verification }
		res.status(200).send(resBody);     
	} else {
		console.log("Processing request for user ");
		console.log(req.body.data.events[0].target[0].displayName);
		console.log(req.body.data.events[0].target[0].alternateId);

		var name = req.body.data.events[0].target[0].displayName;
		var login = req.body.data.events[0].target[0].alternateId;
		var user = await client.enterprise.addUser(login, name);

		console.log(user)
		// createFolderStucture('0', '0', user.id);
		res.status(200).send();
	}
}

async function createFolderStucture(serviceFolderId, userParentFolderId, userId) {
	client.asSelf();
	var serviceAccountFolders = await client.folders.getItems(serviceFolderId);
	for (let serviceAccountFolder of serviceAccountFolders){
		client.asUser(userId);
		var createdUserFolder = await client.folders.create(userParentFolderId, serviceAccountFolder.name);
		await createFolderStucture(serviceAccountFolder.id, createdUserFolder.id, userId);
	}
	return;
}

// async function test() {
// 	var login = "test1234554383@box.com";
// 	var name = "test1";

// 	var user = await client.enterprise.addUser(
// 		login,
// 		name);
// 	console.log(user)
// }