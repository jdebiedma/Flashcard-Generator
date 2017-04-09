var inquirer = require("inquirer");
var fs = require("fs");

function BasicCard (front, back) {

	this.front = front;
	this.back = back;

	inquirer.prompt([

		  {
		    type: "confirm",
		    name: "frontCard",
		    message: front
		  },

		  ]).then(function(user) {

		  	console.log(back);

		  });
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

	inquirer.prompt([

		  {
		    type: "confirm",
		    name: "fulltext",
		    message: res
		  },

		  ]).then(function(user) {

		  	console.log("Answer: " + cloze);

		  });
	
}

// var firstPresident = new BasicCard(
//     "Who was the first president of the United States?", "George Washington");

var firstPresidentCloze = new ClozeCard(
    "George Washington was the first president of the United States.", "George Washington");

