// sound variables
let soundIsActivated = false, resetting = false
// speech-to-text & text-to-speech objects
let speech, speechRecord
let voiceName = "Google UK English Female" // "Google UK English Male" // "Google UK English Female"
// textToSpeech question
let listening = false, listeningError = false
let questionString = ""


function setupSpeech() {

	// if we've already setup the audio
	if (soundIsActivated) return
	soundIsActivated = true
	// instantiate the text-to-speech engine of P5
	speech = new p5.Speech()
	speech.onLoad = speechLoaded
	speech.interrupt = true
	// instantiate the speech-to-text engine of P5
	speechRecord = new p5.SpeechRec() // speech recognition object (will prompt for mic access)
	speechRecord.onResult = speechRecordResult // bind callback function to trigger when speech is recognized
	speechRecord.onStart = speechRecordListening
	speechRecord.onEnd = speechRecordEnded
	speechRecord.onError = speechRecordError
	speechRecord.continuous = false
	speechRecord.interimResults = false

	setupStates()

}

// reset all the current speech & flags
function resetSpeech() {

	// turn off outgoing
	cancelSpeaking()
	// turn off incoming
	speechRecordStop()
	// reset all flags
	listening = false
	listeningError = false
	resetting = true
	questionString = ""
	// tell Twee we've stopped listening (to turn off animation)
	// twee.stoppedListening()

}

// Outgoing Speech functions

// text-to-speech is loaded, configure it
function speechLoaded() {

	// we should be able to interrupt the speech
	speech.interrupt = true
	speech.onStart = speechStarted
	speech.onEnd = speechEnded
	// speech.listVoices()
	speech.setVoice(voiceName)
	changeState("ready")

}

function speak(phrase) {

	// if we are currently listening, stop listening
	if (listening) speechRecordStop()
	// tell twee what we are saying
	// twee.setVariable("phrase", phrase)
	// instructs the synthesizer to speak the string encoded in utterance
	speech.speak(phrase)

}

function cancelSpeaking() {

	// twee.setVariable("phrase", "")
	// silently cancels the current utterance and clears any queued utterances
	speech.cancel()

}

// the robot started speaking
function speechStarted() {

}

// the robot stopped speaking
function speechEnded() {

	changeState("ready")

}



// Incoming Speech Recognition functions

function speechRecordStart() {

	// start listening
	try { speechRecord.start() }
	catch { }
	finally { }
	// reset listening flags
	listening = true
	listeningError = false
	questionString = ""
	// tell Twee we're listening (to turn on animation)
	// twee.startedListening()

}

// we currently listening
function speechRecordListening() {

	changeState("listening")

}

// we're done listening
function speechRecordStop() {

	// reset listening flags
	listening = false
	// tell Twee we've stopped listening (to turn off animation)
	// twee.stoppedListening()

	changeState("stoppedListening")


}

function speechRecordError() {

	// activate error flag
	listeningError = true

}

// we got a speech result
function speechRecordResult() {

	// make sure we still care about the results
	if (!listening) {
		console.log("Received speech but we are no longer listening");
		listening = false
		return;
	}

	if (speechRecord.resultConfidence > 0.5) {
		questionString = speechRecord.resultString
	} else {
		questionString = speechRecord.resultString + " "
	}

	// console.log(speechRecord.resultString) // log the result
	// console.log(speechRecord.resultConfidence)
	// console.log(speechRecord.resultValue)
	// console.log(speechRecord.speechRecordResult)

	changeState("listeningResult")

	// tell twee what the results were of the response
	// twee.setVariable("answer", speechRecord.resultString)

}

// for whatever reason (error, response, etc) we've stopped listening
function speechRecordEnded() {

	// if we had a problem
	if (!resetting && listeningError) {
		// start listening again
		speechRecordStart()
		return
	}
	// // if should still be listening
	// if (!resetting && listening) {
	// 	// start listening again
	// 	speechRecordStart()
	// 	return
	// }

	questionString += "?"
	// change state flags to reflect new state
	changeState("asked")
	// reset listening flag
	listening = false
	// tell Twee we've stopped listening (to turn off animation)
	// twee.stoppedListening()
	// FIXME: this is pretty hacky and is related to speech-still-talking issues
	if (resetting) resetting = false

}
