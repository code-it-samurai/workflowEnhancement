const chalk = require("chalk");

require("dotenv").config({ path: __dirname + "/.env" });
const envDataParser = require("./helpers/commands").envDataParser;
const collectDataTypes = require("./helpers/commands").collectDataTypes;
let optionsDataTypes = {};
const greetings = process.env.GREETING;

module.exports = {
	questions: [
		{
			name: "TASK_TYPE",
			type: "list",
			message: `${greetings} what are you planning to work with?`,
			choices: () => {
				try {
					let options = envDataParser(
						process.env.InitialCommands,
						"object[]"
					);
					optionsDataTypes = {
						...optionsDataTypes,
						...collectDataTypes(options),
					}; // collect data types of all the initial options
					return options;
				} catch(error) {
					console.log(chalk.red("Apologies sir! There seems to be an issue with my code, here are the details"));
					console.error(chalk.red(`${error}`));
					return []
				}

			},
		},
		{
			name: "TASK_TARGET",
			type: "list",
			message:
				"Ahh i see! Please select a command suitable for your required task",
			choices: function (previousAnswer) {
				try {
					let options = envDataParser(
						process.env[previousAnswer.TASK_TYPE],
						optionsDataTypes[previousAnswer.TASK_TYPE]
					);
					return options;
				} catch(error) {
					console.log(chalk.red("Apologies sir! There seems to be an issue with my code, here are the details"));
					console.error(chalk.red(`${error}`));
					return []
				}
			}
			,
		},
		{
			name: "ACTION",
			type: "list",
			message:
				"Ahh i see! Please select a command suitable for your required task",
			choices: function (previousAnswer) {
				try {
					return process.env[previousAnswer.TASK_TARGET].split(",");
				} catch(error) {
					console.log(chalk.red("Apologies sir! There seems to be an issue with my code, here are the details"));
					console.error(chalk.red(`${error}`));
					return []
				}
			},
		},
	],
};