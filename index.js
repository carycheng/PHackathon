var BoxSDK = require('box-node-sdk');
var objectPath = require("object-path");
var BoxCLI = require('@box/cli');

let sdk = new BoxSDK({
	clientID: '',
	clientSecret: '',
	iterators: false
});

var token = process.env.token;
var client = sdk.getBasicClient(token);

exports.generateUser = async (req, res) => {
	console.log("Received a request");
	if (req.method === "GET") {
	  var verification = req.get("X-Okta-Verification-Challenge");
		 var resBody = {"verification":verification }
		res.status(200).send(resBody);     
	} else {
		console.log("Processing request for new user ");
		// console.log(req.body.data.events[0].target[0].displayName);
		// console.log(req.body.data.events[0].target[0].alternateId);
		console.log(req.body);
		var name = objectPath.get(req, process.env.name);
		var id = objectPath.get(req, process.env.id);
		console.log(name);
		console.log(id);

		client.asSelf();
		client.enterprise.addUser(id, name, {
			'is_platform_access_only': true
		}).then(user => {
			console.log(user);
			createFolderStucture('50167809963', '0', user.id);
		});
		res.status(202).send();
	}
}

exports.runCLI = async (req, res) => {
	console.log(req.body);
	var csv = objectPath.get(req, process.env.csv);
	var script = objectPath.get(req, process.env.script);
	console.log(csv);
	console.log(script);

	client.enterprise.addAppUser(name).then(user => {
		console.log(user);
		createFolderStucture('50167809963', '0', user.id);
	});
	res.status(202).send();
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

// var token = "";
// test();
// async function test() {
// 	var login = "sgarlanka+test12fdsagsa3@boxdemo.com";
// 	var name = "test";
// 	var user = await client.enterprise.addUser(login, name);
// 	await createFolderStucture('0', '0', user.id);
// 	client.asUser(user.id);
// 	var userFolders = await client.folders.getItems('0');
// 	console.log(userFolders);
// }

// testCLI();
// var folderName = 'test test12'
// async function testCLI() {
// 	// await BoxCLI.run(['folders:get', '0', '--token', '5KbjAckyyBmoQJF03TKoQCmSTXp63now']);
// 	await BoxCLI.run(['folders:create', '0', folderName]);
// 	// await HerokuConfig.run(['--app', flags.app])
// }