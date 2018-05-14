var request = require('request');
var secrets = require('./secret');
var fs = require('fs');

var token = secrets.Authorization;
console.log('Jacob Presents: The GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
	var options = {
		url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
		headers: {
			'User-Agent': 'request',
			'Authorization': token
		}
	};

	request(options, function(err, res, body) {
		cb(err, body);
	});
}

getRepoContributors("jquery", "jquery", function(err, result) {
	var parsedData = JSON.parse(result);
	//console.log(parsedData);

	//avatarPictures = [];

	for (var i = 0; i < parsedData.length; i++) {
		downloadImageByURL(parsedData[i].avatar_url, './pics/' + parsedData[i].login);
		//avatarPictures.push(parsedData[i].avatar_url);
	}
	//console.log(avatarPictures);



	// console.log("Errors:", err);
	//console.log("Result:", result);
});


function downloadImageByURL(url, filePath) {

request.get(url)               // Note 1
       .on('error', function (err) {                                   // Note 2
         throw err; 
       })
       .on('response', function (response) {                           // Note 3
         console.log('Response Status Code: ', response.statusCode);
       })
       .pipe(fs.createWriteStream(filePath)); 
}
