
// state variables
let currentState = ''

function setupStates() {

	defineReplacement("INTERVIEWER: ", "Interviewer: ")
	defineReplacement("CORITA: ", "Corita: ")
	defineReplacement("STUDENT: ", "Student: ")

}

function changeState(newState) {

	currentState = newState

	if (newState == "ready") stateReady()
	else if (newState == "listening") stateListening()
	else if (newState == "listeningResult") stateListeningResult()
	else if (newState == "stoppedListening") stateListening()
	else if (newState == "asked") stateAsked()
	else if (newState == "responded") stateResponded()
	else console.log("unhandled state: " + newState)

}


function stateReady() {

	// console.log("ready")

}


function stateListening() {

	// turn on recording flag
	document.body.classList.toggle("recording", true);
	document.getElementById("response").getElementsByTagName("p")[0].innerText = "Corita: …"

}


function stateListeningResult() {

	let output = "Interviewer: " + questionString
	document.getElementById("question").getElementsByTagName("p")[0].textContent = output
	document.getElementById("response").getElementsByTagName("p")[0].textContent = ""
	
	// questionString = ""

}


function stateStoppedListening() {

	// turn off recording flag
	document.body.classList.toggle("recording", false);

}


function stateAsked() {

	// turn off recording flag
	document.body.classList.toggle("recording", false);
	
	let output = "Interviewer: " + questionString
	document.getElementById("question").getElementsByTagName("p")[0].textContent = output

	if (questionString == "") {
		console.error("empty question string")
		return
	}
	// send to gpt-2
	askQuestion(questionString)

}


function stateResponded() {

}

