
	
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
	
	// Make an array that will contain room numbers accessible from a given room
	//roomAccess = [N,E, S, W]
	roomAccess = [ [0, -1, -1, -1], [0,-1,1,3], [-1, -1, 1, -1],[-1, 2, 1, 3],[-1,-1,1,-1],[-1,-1,1,-1] ]; // For just 2 rooms - you will need more
	// This is how you will access the target room: roomAccess[currentRoom][dir]
	// e.g., roomAcess[1][NORTH]
	//---------------
	//----------------
	// Make an array of room descriptions (just strings)
	roomDescriptions [ "You're in front of the apartment. Go North to open the door to the livingroom", 
	"You're in the livingroom. Go Left to get to kitchen and go North to get to 2nd Floor",
	"You're in the kitchen. Go South to back out of kitchen to get to 2nd floor",
	"You're in loft on Second Floor. Go Left to get to the 1st bedroom, go Right to get to 2nd bedroom. Go South to get to 1st Floor Livingroom", 
	"You're in the 1st bedroom on Second Floor. Go South to get to Open Loft area",
	"You're in the 2nd bedroom on Second Floor. Go South to get to Open Loft area"];

	// Below is an example of how to set the image based on current room
	imageArray = ["images/livingroom.jpg", "images/kitchen.jpg", "images/openfloor", "images/bedroom1", "images/bedroom2"]; 
	var theImage = document.getElementById("theImage");  // Get reference to <img> element
	theImage.src = imageArray[currentRoom];  // Set the source
}

// You need a function like this to update room image, description, and items
// Should be called after you change the current room
function refreshRoom() {
	// TODO
}

// This function should get the text from the prompt textbox and parse it
// depending on the parsed command, it calls appriopriate functions to
// either take, drop, or go to a different room

function parseCommand() {
	
	
			// TODO - hint: use split() string method to divide text by spaces
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
		// This should be a call to parseCommand
		// -- gets the command form the user
		var commands = document.getElementById("imageURL").value;
		//-debug 
		window.alert("this was your command: "+ commands)
		parseCommand(commands);

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

//-->