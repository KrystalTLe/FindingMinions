function init() {
	// We can make (fake) constants for direction: 0-North, 1-South, ...
	NORTH = 0;
	SOUTH = 1;
	EAST = 2;
	WEST = 3;

	// Initialize score, playerItems, etc.
	score = 0;
	playerItems = [];
	currentRoom = 0;
	playerPossition = 0;
	currentPosition = 0;

	directionArray=['north','south','east','west'];
	// Make an array that will contain room numbers accessible from a given room
	//roomAccess = [N,E, S, W]
	//-------------1------------2--------2------------------3-----------4---------------5--------6--------
	roomAccess = [ ["north"], ["north","south","west"], ["east"],["south","east","west"],["south"],["south"] ]; // For just 2 rooms - you will need more
	// This is how you will access the target room: roomAccess[currentRoom][dir]
	// e.g., roomAcess[1][NORTH]
	//---------------
	//----------------
	// Make an array of room descriptions (just strings)

	roomDescriptions =[ "You're in front of the apartment. 'GO NORTH' to enter the livingroom", 
	"You're in the livingroom. 'GO WEST' to enter kitchen and 'GO NORTH' to go to the 2nd Floor",
	"You're in the kitchen. 'GO EAST' to back out of kitchen to get to living room",
	"You're in loft on Second Floor. 'GO WEST' to get to the 1st bedroom, 'GO EAST' to get to 2nd bedroom. 'GO SOUTH' to get to 1st Floor Livingroom", 
	"You're in the 1st bedroom on Second Floor. 'GO SOUTH' to get to Open Loft area",
	"You're in the 2nd bedroom on Second Floor. 'GO SOUTH' to get to Open Loft area"];
	minionPosition=["images/front.jpg","images/back.jpg","images/left.jpg","images/right.jpg"];
	roomDescriptions[0];
	// Below is an example of how to set the image based on current room
	imageArray = ["images/entrance.jpg","images/livingroom.jpg", "images/kitchen.jpg", "images/openfloor.jpg", "images/bedroom.jpg", "images/bedroom2.jpg"]; 
	var theImage = document.getElementById("theImage");  // Get reference to <img> element
	theImage.src = imageArray[currentRoom];  // Set the source

	var minion=document.getElementById("minion");
	minion.src=minionPosition[currentPosition];
	

}
function scoreCount(){
	var score=document.getElementById("score");
	var bananaCount=document.getElementById("bananaCount");
}

// You need a function like this to update room image, description, and items
// Should be called after you change the current room
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
		if(move == "south");
		{
			currentRoom -= 1;
			console.log("room 2s: " +currentRoom);
		}
		if(move == "west");
		{
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
function refreshRoom(move) {


movementCheck(move);
console.log("before chage: "+ currentRoom);
theImage.src = imageArray[currentRoom];
console.log("after change: "+ currentRoom);


	
	
}

// 
function isValid(commands){

	
	var isAction  = commands.search(/^go /);
	var isDirection = "";
	if (isAction == 0){
		console.log("is action true");
		commands=commands.split(' ');
		var direction=commands[1].toLowerCase();
		isDirection = direction.search(/\w/)
		console.log(isDirection)
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
	return false;
}

function parseCommand() {

	
	
	var command=document.getElementById("command").value;
	var ok = isValid(command);
	if (ok[0] == true){
		document.getElementById("error").innerHTML=" ";
		refreshRoom(ok[1]);
		
		
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
	   // *** YOUR CODE GOES HERE ***
	   	parseCommand()
		// This should be a call to parseCommand

		
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
