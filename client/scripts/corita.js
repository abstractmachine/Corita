
document.body.addEventListener('click', function () {

	// turn on speech engine, if necessary
	setupSpeech()
	// start recording speech
	speechRecordStart()

})


let keyString = ""
document.body.addEventListener('keypress', e => {

	// turn on speech engine, if necessary
	setupSpeech()

	if (e.keyCode == 13) {

		questionString = keyString
		changeState("asked")
		document.getElementById("response").getElementsByTagName("p")[0].textContent = "Corita: …"
		keyString = ""

	} else if (e.keyCode == 3) {


	} else {

		keyString += e.key;
		let output = "Interviewer: " + keyString
		document.getElementById("question").getElementsByTagName("p")[0].textContent = output

	}

})


function askQuestion(question) {

	generatorAskQuestion(question)

}


window.printResponse = function (message) {

	let speech = message
	let printout = message
	let currentStudent = "Student"

	let printoutChanges = { "Interviewer: ": "\nAssistant: ", "Corita: ": "\nCorita: ", "Student: ": "\nStudent: ", "STUDENT": currentStudent }

	// go through each possible replacement
	for (var key in printoutChanges) {
		if (printout == null) continue;
		printout = printout.split(key).join(printoutChanges[key])
	}

	document.getElementById("response").getElementsByTagName("p")[0].innerText = printout

	let laughterPossibilities = ["Ha ha ha…", "Ha ha…", "Ha…"]
	let laughterIndex = Math.floor(Math.random()*laughterPossibilities.length)
	let laughterString = laughterPossibilities[laughterIndex]

	let speechChanges = { "Interviewer: ": "\n", "Assistant: ": "\n", "Corita: ": "\n", "Student: ": "\n", "{laughter}": laughterString }

	// go through each possible replacement
	for (var key in speechChanges) {
		if (speech == null) continue;
		speech = speech.split(key).join(speechChanges[key])
	}

	// console.log("printResponse()")
	// console.log(speech)

	speak(speech + ".")

	this.changeState("responded")

}
