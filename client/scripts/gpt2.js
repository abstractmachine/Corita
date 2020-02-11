const socket = io()

let replacements = {}
let gptOutput = ""

socket.on('gpt2-response', message => {

	gptOutput = parseResults(message);
	printResponse(gptOutput)

	changeState("responded")

})


socket.on('gpt2-error', message => {

	console.error("gpt2-error", message)

})


window.defineReplacement = function (replacementKey, replacementValue) {

	replacements[replacementKey] = replacementValue;

}


window.resetGenerator = function () {

	replacements = {} // "$Hero": "$StoryHero", "$Donor": "$StoryDonor", "$MagicalObject": "$StoryMagicalObject", "$Helper": "$StoryHelper", "$Villain": "$StoryVillain", "$Prince": "$StoryPrince", "$Place": "$StoryPlace"
}


window.generatorAskQuestion = function (question) {

	// prepend message
	question = "INTERVIEWER: " + question
	socket.emit('gpt2-prompt', question)

}


window.parseResults = function (results) {

	// filter out backticks
	if (results != null) {
		results = results.replace(/`/g, '')
	}

	// go through each possible replacement
	for (var key in replacements) {
		if (results == null) continue;
		results = results.split(key).join(replacements[key])
	}

	// remove the dangling part after the last period
	if (results != null) {
		let lastPeriodIndex = results.lastIndexOf("\.")
		// if there was no period
		if (-1 == lastPeriodIndex) {
			results += "…"
		} else {
			results = results.substr(0, lastPeriodIndex + 1)
		}
	}

	return results

}


let twee;
window.defineTwee = function (tweeObject) {
	twee = tweeObject;
}


let engine;
window.defineTweeEngine = function (engineObject) {
	engine = engineObject;
}


