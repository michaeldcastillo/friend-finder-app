var friendsArray = require("../data/friends");

module.exports = function(app) {

  //handle API get requests from the client
  app.get("/api/friends", function(req, res) {

      console.log("friendsArray = ", friendsArray);
    res.json(friendsArray);

  });

  //handle API post requests from the client
  app.post("/api/friends", function(req, res) {

    console.log("\nreq.body = ", req.body);
    var newFriendObject = req.body; //this is an object with an array of scores as a key value
    var array2 = req.body.scores; //this is an array of numbers stored as strings

    for (var i = 0, z = array2.length; i < z; i++) {
        array2[i] = parseInt(array2[i]);
    }

    var array1 = [];
    var totalDifference = 0;
    var leastDifferenceArray = [];
    for (var i = 0, z = friendsArray.length; i < z; i++) {

      totalDifference = 0;
      // donna, ahmed, jane
        array1 = friendsArray[i].scores; //[3, 2, 6, 4, 5, 1, 2, 5, 4, 1]
        console.log("\n");
        console.log("array1 = ", array1);
        console.log("array2 = ", array2);
        
      // loop through each score value
        for (var j = 0, x = 10; j < x; j++) {

          //console.log("array1[j] = ", array1[j]);
          //console.log("array2[j] = ", array2[j]);
          totalDifference += Math.abs(array1[j] - array2[j]); 
   
        }
        console.log("totalDifference = ", totalDifference); //donna = 20, ahmed = 9, jane = 13
        leastDifferenceArray.push(totalDifference); 

    }

    console.log("\n");
    console.log("leastDifferenceArray = ", leastDifferenceArray);
    console.log(Math.min.apply(null, leastDifferenceArray));

    var leastValue = Math.min.apply(null, leastDifferenceArray);
    var index = leastDifferenceArray.indexOf(leastValue);

    console.log("index = ", index);
    console.log(friendsArray[index]);

    var bestMatch = friendsArray[index];

    //push the new user to the array of users AFTER we perform the comparison logic!
    friendsArray.push(newFriendObject);

    res.json(bestMatch);

  });

};
