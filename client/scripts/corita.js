let useRestartTimeout = true
let timeoutDuration = 300000 // 1000 = 1sec // 5 * 60 * 1000 = 5 minutes

let firstClick = true
document.body.addEventListener('click', function () {

	// turn on speech engine, if necessary
	setupSpeech()
	// erase current texts
	document.getElementById("question").getElementsByTagName("p")[0].textContent = "Interviewer: …"
	document.getElementById("response").getElementsByTagName("p")[0].textContent = "Corita: …"
	// fill in texts
	document.getElementById("instructions").getElementsByTagName("p")[0].textContent = "Click to talk. Type to write a question for Corita."

	// if this is the first-click-to-activate microphone access (to reassure browser security)
	if (firstClick) {
		// turn off first-click flag
		firstClick = false
		// if we use a restart timer to reload the page every n seconds
		if (useRestartTimeout) {
			setTimeout(function () {
				window.location.reload(1)
			}, timeoutDuration) // 1000 = 1sec // 5 * 60 * 1000 = 5 minutes
		}
		// don't start the recording
		return
	} else {
		// start recording speech
		speechRecordStart()
	}

})


let eraseTypewriter = false
let lastLength = 0

var typewriter = document.getElementById("typewriter")
if (typewriter.addEventListener) {
	typewriter.addEventListener('input', function () {

		if (eraseTypewriter && typewriter.value.length < lastLength) {
			typewriter.value = ""
			eraseTypewriter = false
		}

		let output = "Interviewer: " + typewriter.value
		document.getElementById("question").getElementsByTagName("p")[0].textContent = output

		lastLength = typewriter.value.length

	}, false);
}


let keyString = ""
document.body.addEventListener('keypress', e => {

	// turn on speech engine, if necessary
	setupSpeech()

	if (e.keyCode == 13) {

		questionString = typewriter.value
		changeState("asked")
		document.getElementById("response").getElementsByTagName("p")[0].textContent = "Corita: …"
		keyString = ""
		eraseTypewriter = true

	} else {

		if (eraseTypewriter) {
			typewriter.value = ""
			eraseTypewriter = false
		}

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
	let laughterIndex = Math.floor(Math.random() * laughterPossibilities.length)
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
