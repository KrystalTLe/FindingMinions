// Names:  	Osvaldo Gonzalez
// 			Krystal Le
// 	Project 2. Distributed and Web Programming. Fall 2016
function init() {
	// Initialize variables
	currentRoom = 0; 
	score_banana=0;//Keeps tracks of scores
	banana_count=0;//Keeps track of number of bananas 
	randomBanana=0; //Put random number of bananas for each room
	numArray=[]; //generate an array of 6 randomly generated ints
	for (var i=0; i<6; i++){
		randomBanana=Math.floor((Math.random() *2)); 
		numArray.push(randomBanana);

	}
	
	//Room descriptions
	roomDescriptions =[ 
	"You're in front of the apartment. 'GO NORTH' to enter the livingroom", 
	"You're in the livingroom. 'GO WEST' to enter kitchen and 'GO NORTH' to go to the 2nd Floor",
	"You're in the kitchen. 'GO SOUTH' to back out of kitchen to get to living room",
	"You're in loft on Second Floor. 'GO WEST' to get to the 2st bedroom, 'GO EAST' to get to 1nd bedroom. 'GO SOUTH' to get to 1st Floor Livingroom", 
	"You're in the 1st bedroom on Second Floor. 'GO SOUTH' to get to Open Loft area",
	"You're in the 2nd bedroom on Second Floor. 'GO SOUTH' to get to Open Loft area",
	"There is a banana in this room. 'TAKE BANANA' to get the banana and score some points"];


	//Prints the room descriptions starting at the first 
	document.getElementById("description").innerHTML=roomDescriptions[0];
	
	// Below is an example of how to set the image based on current room
	imageArray = ["images/entrance.jpg","images/livingroom.jpg", "images/kitchen.jpg", "images/openfloor.jpg", "images/bedroom.jpg", "images/bedroom2.jpg"]; 
	var theImage = document.getElementById("theImage");  // Get reference to <img> element
	theImage.src = imageArray[currentRoom];  // Set the source

	//Gets the minion to be placed in to the game
	minion=document.getElementById("minion");
	minion.src="images/minion5.jpg";
	checkForBanana(currentRoom, 0);

	
}
//This function checks whether there is a banana in the room and perform neccessary 
//action such as prompting user to "take the banana an score points"
function checkForBanana(currentRoom, myitem){
	
	
	if (numArray[currentRoom]!=0) {
		document.getElementById("bananaFound").innerHTML=roomDescriptions[6];
		
		if (myitem=="take") {
			
			score(numArray[currentRoom]);
		}
	}if (numArray[currentRoom]==0) {
		
		document.getElementById("bananaFound").innerHTML='There is no banana in the room';
	}
}
//This function perform the scoring, for each banana collected, user scores 10 points.
function score(numberOfBanana){

	score_banana=score_banana+(numberOfBanana*10)

	document.getElementById("score").innerHTML=score_banana;
	banana_count=banana_count+numberOfBanana;

	document.getElementById("bananaCount").innerHTML=banana_count;

	numArray[currentRoom]=0;
	
	document.getElementById("bananaFound").innerHTML='There is no banana left in the room';



}
//This function move rooms based on user's current position and command entered.
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


//This function parses, validates commands entered by users.
function parseCommand(){
	var command=document.getElementById("command").value;
	//Array of directions, used to determine what to do with user input
	var directionArray = ["north","west","east","south"];
	//Checks if the first word is go
	//When user enters direction command
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
					checkForBanana(currentRoom, 0);
				}
			}
		}
	}
	//When user enters take command
	else if( command.search(/^take /)== 0){
		command=command.split(' ');
		var myitem=command[1].toLowerCase();
		if( myitem =="banana"){
			// pass current room and banana 
			checkForBanana(currentRoom, command[0]);
		}
	}else{
	//if nothing works then break 
	document.getElementById("description").innerHTML="Please make sure you enter command in the right format: Go [North][South][East][West]";
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

		parseCommand();
		
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
