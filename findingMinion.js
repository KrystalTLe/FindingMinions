// Names:  	Osvaldo Gonzalez
// 			Krystal Le
// 	Project 2. Distributed and Web Programming. Fall 2016
function init() {
	// Initialize variables
	playerItems = [];
	currentRoom = 0;
	playerPossition = 0;
	currentPosition = 0;

	//Room descriptions
	roomDescriptions =[ "You're in front of the apartment. 'GO NORTH' to enter the livingroom", 
	"You're in the livingroom. 'GO WEST' to enter kitchen and 'GO NORTH' to go to the 2nd Floor",
	"You're in the kitchen. 'GO SOUTH' to back out of kitchen to get to living room",
	"You're in loft on Second Floor. 'GO WEST' to get to the 2st bedroom, 'GO EAST' to get to 1nd bedroom. 'GO SOUTH' to get to 1st Floor Livingroom", 
	"You're in the 1st bedroom on Second Floor. 'GO SOUTH' to get to Open Loft area",
	"You're in the 2nd bedroom on Second Floor. 'GO SOUTH' to get to Open Loft area",
	"There is a banana in this room. 'TAKE BANANA' to get the banana and score some points"];
	minionPosition=["images/front.jpg","images/back.jpg","images/left.jpg","images/right.jpg"];

	//Prints the room descriptions starting at the first 
	document.getElementById("description").innerHTML=roomDescriptions[0];
	
	// Below is an example of how to set the image based on current room
	imageArray = ["images/entrance.jpg","images/livingroom.jpg", "images/kitchen.jpg", "images/openfloor.jpg", "images/bedroom.jpg", "images/bedroom2.jpg"]; 
	var theImage = document.getElementById("theImage");  // Get reference to <img> element
	theImage.src = imageArray[currentRoom];  // Set the source

	//Gets the minion to be placed in to the game
	minion=document.getElementById("minion");
	minion.src=minionPosition[currentPosition];
	//scoreBananaCount();
	
}


//Function checks and moves the room to a different rom;
function movementCheck(move){
	// gets the location of the current room
	
	switch(currentRoom){
	// room one movements
	case 0:
		//move in to living room
		if(move == "north"){
			currentRoom += 1;
			
		}
			break;// this is the livingRoom
			case 1:
		// move upstairs
		if (move == "north"){

			currentRoom += 2;
			
		}
		
		//move to back to living room
		if(move == "south") {
			currentRoom -= 1;
			
		}
		if(move == "west") {
			currentRoom += 1;
			
		}

		break;
	//kitchen 
	case 2:
		// go back to Living room
		if(move == "south"){
			currentRoom -=1;
			
		}
		break;
	//openfloor
	case 3:
		// go to room 1
		if (move == "east") {
			currentRoom +=1;
			
		}
		// go to room 2
		if(move == "west") {
			currentRoom +=2;
		}
		// go to back to living Room
		if(move == "south") {
			currentRoom -= 2;
		}
		break;
	//room 1
	case 4:
		// go back to openfloor
		if(move == "south"){
			currentRoom -=1;
		}
		break;
	//room 2 
	case 5:
		// go back to open floor;
		if(move == "south"){
			currentRoom -=2;
		}
		break;
		
	}

}
//This function check for movement and depending on command it will pudate screen to the apropriate display
function refreshRoom(move) {
	movementCheck(move);
	theImage.src = imageArray[currentRoom];
	document.getElementById("description").innerHTML=roomDescriptions[currentRoom];

}

//*************Bug needs fixed*****************
//This function keeps the score
// function scoreBananaCount(){
// 	var score=document.getElementById("score");
// 	var bananas=document.getElementById("banana");
// 	var randomBanana=0;
// 	randomBanana=Math.floor((Math.random() * 4));
// 	console.log("random" + randomBanana);
// 	if (randomBanana==2){
// 		console.log("here");
// 		document.getElementById("bananaFound").innerHTML=roomDescriptions[6];
// 		console.log(document.getElementById("bananaFound").innerHTML=roomDescriptions[6]);
// 		parseCommand();
// 	}	
// }
//*************Bug needs fixed*****************


//This function parses, validates command and performs actions
function parseCommand(){
	var command=document.getElementById("command").value;
	//Array of directions, used to determine what to do with user input
	var directionArray = ["north","west","east","south"];
	//Checks if the first word is go
	//var isAction  = command.search(/^go /);
	
	var isDirection = "";
	if (command.search(/^go /) == 0){
		command=command.split(' ');
		var direction=command[1].toLowerCase();
		// Checks if the command not a number or blank 
		isDirection = direction.search(/\w/)
		//Chen it checks if the second argument is a valid movement EX: west, north south east
		if(isDirection == 0 ){
			for (var i=0; i<directionArray.length; i++){
				if (direction == directionArray[i]){
					refreshRoom(direction);
				}
			}
		}
	}
	//console.log("action1"+isAction);
	//Cheks if the user wants to get a banana
	//isAction  = command.search(/^take /);
	//console.log("action2"+isAction);
	else if( command.search(/^take /)== 0){
		command=command.split(' ');
		var myitem=command[1].toLowerCase();
		if( myitem =="banana"){
			itemCheck();
		}
	}else{
	//if nothing works then break 
	return document.getElementById("description").innerHTML="Please make sure you enter command in the right format: Go [North][South][East][West]";
}
}


// Event handler that checks if user pressed ENTER key
// if so, it parses the text and updates the room (if needed)
function newCommand() {
// Get the code for the character that was pressed
var x;
	if(window.event) // IE8 and earlier
	{
		x=event.keyCode;
	}
	else if(event.which) // IE9/Firefox/Chrome/Opera/Safari
	{
		x=event.which;
	}	

	// Check if "enter" was pressed
	if (x==13) {
		parseCommand()
	  // Stop event propagation
	  if(!e) var e = window.event;
	  e.cancelBubble = true;
	  e.returnValue = false;
	  if (e.stopPropagation) {
	  	e.stopPropagation();
	  	e.preventDefault();
	  }		
	}	 
}
