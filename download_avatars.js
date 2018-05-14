var request = require('request');
var secrets = require('./secret');

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
 
      avatarPictures = [];
      
      for (var i = 0; i < parsedData.length; i++) {
        console.log(parsedData[i].avatar_url);
      }
      console.log(avatarPictures);
    
      

 // console.log("Errors:", err);
  //console.log("Result:", result);
});