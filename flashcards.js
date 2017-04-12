var inquirer = require("inquirer");
var fs = require("fs");

var basicQ = [];
var basicA = [];

var newcount = 0;
var twocount = 0;

var basicLength;
var clozeLength;

var newCardCount;

function BasicCard (front, back) {

	this.front = front;
	this.back = back;

	this.begin = function() {inquirer.prompt([

		  {
		    type: "confirm",
		    name: "frontCard",
		    message: front
		  },

		  ]).then(function(user) {

		  	console.log(back);

		  	newcount++;

		  	if (newcount < basicLength) {

		  	doBasic();
		  }

		  });
  	}
} 

function ClozeCard (text, cloze) {

	this.text = text;
	this.cloze = cloze;

	var str = this.text;
	var res = str.replace(this.cloze, "___________");

	this.returnCloze = function() {

		if ((this.text).includes(this.cloze)) {

			console.log(this.cloze)
		}

		else {throw new Error("Cloze Text not found! Please fix flashcard: " + this.text)}
	}

	this.returnPartial = function () {

		if ((this.text).includes(this.cloze)) {

			console.log(res);
		}

		else {throw new Error("Cloze Text not found! Please fix flashcard: " + this.text)}
	}

	this.returnFull = function () {

		if ((this.text).includes(this.cloze)) {


			console.log(this.text);

		}

		else {throw new Error("Cloze Text not found! Please fix flashcard: " + this.text)}

	}

	this.begin = function() {inquirer.prompt([

		  {
		    type: "confirm",
		    name: "fulltext",
		    message: res
		  },

		  ]).then(function(user) {

		  	console.log("Answer: " + cloze);

		  	twocount++;

		  	if (twocount < clozeLength) {

		  	doCloze();
		  }

		  });
	}  
	
}



inquirer.prompt([

		{
		    type: "list",
		    name: "firstChoice",
		    message: "What would you like to do?",
		    choices: ["Practice Stored Basic Flashcards", "Practice Stored Cloze Flashcards", "Add Basic Flashcards", "Add Cloze Flashcards"]
  		},

	]).then(function(user) {

		if (user.firstChoice === "Practice Stored Cloze Flashcards") {
			doCloze();
		}

		else if (user.firstChoice === "Practice Stored Basic Flashcards") {
			doBasic();   			
		}

		else if (user.firstChoice === "Add Basic Flashcards") {

			inquirer.prompt([

		  {
		    type: "list",
		    name: "numCards",
		    message: "How many new basic flashcards are you making?",
		    choices: ["1", "2", "3", "4", "5"]
		  },

		  ]).then(function(user) {

		  	console.log(user.numCards);

		  	newCardCount = parseInt(user.numCards);

		  	doBasicMaker();

		  });

//		I left in the commands below in case you wanted to test their functionality later.			

// 	var firstPresident = new BasicCard(
//     "Who was the first president of the United States?", "George Washington");

// // "Who was the first president of the United States?"
// console.log(firstPresident.front); 

// // "George Washington"
// console.log(firstPresident.back); 

// var firstPresidentCloze = new ClozeCard(
//     "George Washington was the first president of the United States.", "George Washington");

// // "George Washington"
// console.log(firstPresidentCloze.cloze); 

// // " ... was the first president of the United States.
// firstPresidentCloze.returnPartial(); 

// // "George Washington was the first president of the United States.
// firstPresidentCloze.returnFull();


		}

	

	}).catch(function () {
     console.log("Promise Rejected");
  });


function doBasic () {

	fs.readFile("basic-storage.txt", 'utf8', function(error, data) {        
        if (error) {
            console.log("There's an error.")
		}
			basicLength = JSON.parse(data).length;

			

			var juicy = JSON.parse(data)[newcount][0];
			var poopy = JSON.parse(data)[newcount][1];


			var newCard = new BasicCard(juicy, poopy);

			newCard.begin();

		});
}


function doCloze () {

	fs.readFile("cloze-storage.txt", 'utf8', function(error, data) {        
	    if (error) {
	        console.log("There's an error.")
		}
			clozeLength = JSON.parse(data).length;

			var joopy = JSON.parse(data)[twocount][0];
			var zoopy = JSON.parse(data)[twocount][1];

			var newCloze = new ClozeCard(joopy, zoopy);

			newCloze.begin();
		});	

}

function doBasicMaker() {

	inquirer.prompt([
		{
			name: "basicFront",
			message: "What does the front of the card say?"
		}, 
	
		{
			name: "basicBack",
			message: "What does the back of the card say?"
		}
		
			]).then(function(input) {

				var newBasic = new BasicCard(input.basicFront, input.basicBack);

				basicQ.push(newBasic);

				if (basicQ.length < newCardCount) {
					basicQ.push(newBasic);
					doBasicMaker();
				} 

				else {

					console.log('Complete!');

					

					// for (var i = 0; i < newCardCount; i++) {
					// 	newBasic.begin();
					// }
				}

			});

}
