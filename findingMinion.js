
	
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
	currentPosition=0;
	// Make an array that will contain room numbers accessible from a given room
	//roomAccess = [N,E, S, W]
	roomAccess = [ [0, -1, -1, -1], [0,-1,1, 3 ], [-1, -1, 1, -1],[-1, 2, 1, 3],[-1,-1,1,-1],[-1,-1,1,-1] ]; // For just 2 rooms - you will need more
	// This is how you will access the target room: roomAccess[currentRoom][dir]
	// e.g., roomAcess[1][NORTH]
	//---------------
	//----------------
	// Make an array of room descriptions (just strings)
	roomDescriptions =[ "You're in front of the apartment. Go North to open the door to the livingroom", 
	"You're in the livingroom. Go Left to get to kitchen and go North to get to 2nd Floor",
	"You're in the kitchen. Go South to back out of kitchen to get to 2nd floor",
	"You're in loft on Second Floor. Go Left to get to the 1st bedroom, go Right to get to 2nd bedroom. Go South to get to 1st Floor Livingroom", 
	"You're in the 1st bedroom on Second Floor. Go South to get to Open Loft area",
	"You're in the 2nd bedroom on Second Floor. Go South to get to Open Loft area"];
	minionPosition=["images/front.jpg","images/back.jpg","images/left.jpg","images/right.jpg"];
	// Below is an example of how to set the image based on current room
	imageArray = ["images/entrance.jpg","images/livingroom.jpg", "images/kitchen.jpg", "images/openfloor", "images/bedroom", "images/bedroom2"]; 
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
function refreshRoom() {
	// TODO
}

// This function should get the text from the prompt textbox and parse it
// depending on the parsed command, it calls appriopriate functions to
// either take, drop, or go to a different room
function isValid(commands){

	var directionArray=['north','south','east','west'];
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
					return true;
				}
			}
		}
	}
	return false;
}

function parseCommand() {

	
	
	var command=document.getElementById("command").value;
	var ok = isValid(command);
	if (ok == true){
		document.getElementById("error").innerHTML=" ";
		
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
