require("dotenv").config({ path: __dirname + "/.env" });
const envDataParser = require("./helpers/commands").envDataParser;
const collectDataTypes = require("./helpers/commands").collectDataTypes;
let optionsDataTypes = {};

module.exports = {
	questions: [
		{
			name: "TASK_TYPE",
			type: "list",
			message: "what do you want to do?",
			choices: () => {
				let options = envDataParser(process.env.InitialCommands, 'object[]');
				optionsDataTypes = {...optionsDataTypes, ...collectDataTypes(options)}; // collect data types of all the initial options
				return options;
			},
		},
		{
			name: "TASK_TARGET",
			type: "list",
			message: "project?",
			choices: function (previousAnswer) {
				let options = envDataParser(process.env[previousAnswer.TASK_TYPE], optionsDataTypes[previousAnswer.TASK_TYPE]);
				return options;
			},
		},
		{
			name: "ACTION",
			type: "list",
			message: "Please choose a command from the list",
			choices: function (previousAnswer) {
				console.log("HAHAHAHAA", process.env[previousAnswer.TASK_TARGET].split(","))
				return process.env[previousAnswer.TASK_TARGET].split(",");
			}
		},
	],
};