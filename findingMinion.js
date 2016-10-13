function init() {
	// We can make (fake) constants for direction: 0-North, 1-South, ...
	NORTH = 0;
	SOUTH = 1;
	EAST = 2;
	WEST = 3;

	// Initialize score, playerItems, etc.
	score = 0;
	banana = 0;
	playerItems = [];
	itemLocatins=[];
	currentRoom = 0;
	playerPossition = 0;
	currentPosition = 0;
	//--this will make random numbers 0-2 for a random placement of bananas
	for (var i=0;i<5;i++){
		itemLocatins[i] = Math.random()*2
	}
	//--used for comparison 
	directionArray = ["north","west","east","south"];
	// -- prints items locatins, for debuging!
	console.log(itemLocatins);
	//-- room descriptions
	roomDescriptions =[ "You're in front of the apartment. 'GO NORTH' to enter the livingroom", 
	"You're in the livingroom. 'GO WEST' to enter kitchen and 'GO NORTH' to go to the 2nd Floor",
	"You're in the kitchen. 'GO SOUTH' to back out of kitchen to get to living room",
	"You're in loft on Second Floor. 'GO WEST' to get to the 2st bedroom, 'GO EAST' to get to 1nd bedroom. 'GO SOUTH' to get to 1st Floor Livingroom", 
	"You're in the 1st bedroom on Second Floor. 'GO SOUTH' to get to Open Loft area",
	"You're in the 2nd bedroom on Second Floor. 'GO SOUTH' to get to Open Loft area"];
	minionPosition=["images/front.jpg","images/back.jpg","images/left.jpg","images/right.jpg"];
	//-- prints the room descriptions starting at the first 
	document.getElementById("error").innerHTML=roomDescriptions[0];
	
	// Below is an example of how to set the image based on current room
	imageArray = ["images/entrance.jpg","images/livingroom.jpg", "images/kitchen.jpg", "images/openfloor.jpg", "images/bedroom.jpg", "images/bedroom2.jpg"]; 
	var theImage = document.getElementById("theImage");  // Get reference to <img> element
	theImage.src = imageArray[currentRoom];  // Set the source
	//--gets the minion to be placed in to the game
	minion=document.getElementById("minion");
	minion.src=minionPosition[currentPosition];
	//minion.style.position = 'relative';

}

function scoreCount(){
	var score=document.getElementById("score");
	var bananaCount=document.getElementById("bananaCount");
}

//--function checks and moves the room to a different rom;
function movementCheck(move){
	// gets the location of the current room
	console.log("current room: "+currentRoom);
switch(currentRoom){
	// room one movements
	case 0:
		//move in to living room
		if(move == "north"){
			currentRoom += 1;
			console.log("Array position: "+currentRoom);
		}
			break;// this is the livingRoom
	case 1:
		// move upstairs
		if (move == "north"){
		
			currentRoom += 2;
			console.log("room 2: " +currentRoom);
		}
		
		//move to back to living room
		if(move == "south") {
			currentRoom -= 1;
			console.log("room 2s: " +currentRoom);
		}
		if(move == "west") {
			currentRoom += 1;
			console.log("room 2s: " +currentRoom);
		}

		break;
	//kitchen 
	case 2:
		// go back to Living room
		if(move == "south"){
			currentRoom -=1;
			console.log("room 3s: " +currentRoom);
		}
		break;
	//openfloor
	case 3:
		// go to room 1
		if (move == "east") {
			currentRoom +=1;
			console.log("room 4s: " +currentRoom);
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
function roomChange(){
	  // Get reference to <img> element
	theImage.src = imageArray[currentRoom];
	return;
}
//-- this function will chekc if there is a banana in the room and it will update banana count
function itemCheck(){
	// -- BUGGG needs fix! stay in one room and enter banna multiple times cheat 
	if(itemLocatins[currentRoom] > 1){
		playerItems[currentPosition] = 1;
		banana +=1;
		document.getElementById("bananaCount").innerHTML=banana;
	}
}
//-- this function check for movement and depending on command it will pudate screen to the apropriate display
function refreshRoom(move) {
movementCheck(move);
theImage.src = imageArray[currentRoom];
document.getElementById("error").innerHTML=roomDescriptions[currentRoom];

}

// -- checks if the argument is valid and follows a certain pattern
function isValid(commands){

	//--checks if the first word is go, 
	var isAction  = commands.search(/^go /);
	var isDirection = "";
	if (isAction == 0){
		console.log("is action true");
		commands=commands.split(' ');
		var direction=commands[1].toLowerCase();
		// checks if the command not a number or blank 
		isDirection = direction.search(/\w/)
		console.log(isDirection)
		//--then it checks if the second argument is a valid movement EX: west, north south east
		if(isDirection == 0 ){
			console.log("is direction true")
			for (var i=0; i<directionArray.length; i++){
				if (direction == directionArray[i]){
					console.log(" yay command is correct!")
					return [true, direction];
				}
			}
		}
	}
	//-- cheks if the user wants to get a banna
	isAction  = commands.search(/^take /);
	if(isAction == 0){
		commands=commands.split(' ');
		var myitem=commands[1].toLowerCase();
		if( myitem =="banana"){
			return [true, myitem];
		}
	}
	//if nothing works then break 
	return false;
}
// -- if the user enters the correct command it gets banna or moves rooms
function parseCommand() {
	
	var command=document.getElementById("command").value;
	var ok = isValid(command);
	if (ok[0] == true){
		document.getElementById("error").innerHTML=" ";
		// -- the user wants to check if theres a banan 
		if(ok[1] =="banana"){
			itemCheck();
			console.log(playerItems);

		}
		// -- this means a direction was entered, the program proceeds
		if(ok[1]!="banana"){
			refreshRoom(ok[1]);
		}
		
	}else{
		document.getElementById("error").innerHTML="Please make sure you enter command in the right format: Go [North][South][East][West]";
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
