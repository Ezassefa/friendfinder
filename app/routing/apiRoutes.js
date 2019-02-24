


var friends = require("../data/friends.js");


//ROUTING

module.exports = function(app) {

  // API GET Request
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });


  // API POST Requests
  app.post('/api/friends', function(req, res) {
		var userInput = req.body;
		var userResponses = userInput.scores;
		
		// Compute best friend match
		var matchName = '';
		var matchImage = '';
		var totalDifference = 1000; 

		// Compare Existing Friends
		for (var i = 0; i < friends.length; i++) {

			var diff = 0;
			for (var j = 0; j < userResponses.length; j++) {
				diff += Math.abs(friends[i].scores[j] - userResponses[j]);
			}
			console.log('diff = ' + diff);

			// if its lowest difference than this is your friend match
			if (diff < totalDifference) {

				totalDifference = diff;
				matchName = friends[i].name;
				matchImage = friends[i].photo;
			}
		}

		friends.push(userInput);
		res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
	});

};