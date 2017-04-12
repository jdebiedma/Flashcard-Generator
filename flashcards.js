var inquirer = require("inquirer");
var fs = require("fs");

var questions = [];
var answers = [];

var newcount = 0;
var twocount = 0;

var basicLength;
var clozeLength;

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
		    choices: ["Practice with Basic Flashcards", "Practice with Cloze Flashcards", "Add Flashcard", "Remove Flashcard"]
  		},

	]).then(function(user) {

		if (user.firstChoice === "Practice with Cloze Flashcards") {
			doCloze();
		}

		else if (user.firstChoice === "Practice with Basic Flashcards") {
			doBasic();   			
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
