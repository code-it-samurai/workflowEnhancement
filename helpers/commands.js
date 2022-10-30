let exec = require("child_process").exec;
const chalk = require("chalk");
require("dotenv").config({ path: __dirname + "/.env" });

function generateCommand(answers){
    const taskType = answers.TASK_TYPE.toLowerCase();
    const taskTarget = answers.TASK_TARGET.toLowerCase();
    const action = answers.ACTION.toLowerCase();
}
// allows us to execute terminal commands from here
function executeTerminalCommands(command) {
	exec(command, (error, stdout, stderr) => {
		if (error) {
			console.error(chalk.red(`${error}`));
		} else {
			console.log(chalk.green(stdout));
		}
	});
}

function envDataParser(envObjects, datatype){
	let parsedOptions = [];
	switch (datatype) {
		case "object[]":
			if (envObjects.includes(",,")) {
				parsedOptions = envObjects.split(",,");
				for (let i = 0; i < parsedOptions.length; i++) {
					parsedOptions[i] = envObjectParser(parsedOptions[i]);
				}
				return parsedOptions;
			} else {
				parsedOptions = envObjectParser(envObjects);
				return [parsedOptions];
			}
		case "string[]":
			if(envObjects.includes(",")){
				parsedOptions = envObjects.split(",");
				return parsedOptions;
			} else {
				return [envObjects]
			}
	}
}

function envObjectParser(envObject){
	return JSON.parse(envObject);
}

function collectDataTypes(options){
	let optionsDataType = {}
	if(options.length > 0){
		for (let i = 0; i < options.length; i++) {
			optionsDataType[options[i].value] = options[i].dataType;
		}
	}else if(options.length <= 0){
		optionsDataType[options.value] = options.dataType;
	}
	return optionsDataType;
}

module.exports = { executeTerminalCommands, envDataParser: envDataParser, collectDataTypes };
