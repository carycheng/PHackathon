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

exports.generateUser = async (req, res) => {
	var login = process.env.login;
	var name = process.env.name;

	var user = await client.enterprise.addUser(
		login,
		name,
		{
			role: client.enterprise.userRoles.USER
		});

	createFolderStucture('0', '0', user.id);
	res.status(200).send(user);
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