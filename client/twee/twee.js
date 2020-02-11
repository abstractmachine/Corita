
window.defineTwee = function() {
	window.parent.defineTwee(window)
}
defineTwee();


window.defineTweeEngine = function() {
	window.parent.defineTweeEngine(Engine)
}
defineTweeEngine();


window.getVariables = function () {
	return State.variables
}


window.getVariable = function (variableName) {
	return State.variables[variableName]
}


window.setVariable = function (variableName, value) {
	State.variables[variableName] = value
}


window.askQuestion = function(question) {
	window.parent.generatorAskQuestion(question)
}