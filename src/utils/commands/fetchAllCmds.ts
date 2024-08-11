import fs from "fs";
import path from "path";
import { CommandObject, ContextMenuObject } from "typings";
export = () => {
	const commands: CommandObject[] = [];
	const foldersPath = path.join(__dirname, "../../commands");
	const commandFolders = fs.readdirSync(foldersPath);
	for (const folder of commandFolders) {
		if (folder.endsWith(".ts")) {
			const filePath = path.join(foldersPath, folder);
			const command: CommandObject = require(filePath);
			if ("data" in command && "callback" in command) {
				command.data = command.data.setDMPermission(false);
				commands.push(command);
			} else {
				console.log(
					`[WARNING] The command at ${filePath} is missing a required "data" and "callback" property.`
				);
			}
			continue;
		}

		const commandsPath = path.join(foldersPath, folder);
		const commandFiles = fs
			.readdirSync(commandsPath)
			.filter((file) => file.endsWith(".ts"));

		if (!commandFiles.includes("index.ts")) {
			console.log(
				`[WARNING] The command at ${commandsPath} is missing a required index.ts file.`
			);
		} else {
			let command = require(path.join(
				commandsPath,
				"index.ts"
			)) as CommandObject;
			command.data = command.data.setDMPermission(false);
			commands.push(command);
		}
	}

	const contextMenuPath = path.join(__dirname, "../../contextMenus");
	const contextFiles = fs.readdirSync(contextMenuPath);
	for (const file of contextFiles) {
		const filePath = path.join(contextMenuPath, file);
		const command: ContextMenuObject = require(filePath);
		if ("data" in command && "callback" in command) {
			command.data = command.data.setDMPermission(false);
			commands.push(command);
		} else {
			console.log(
				`[WARNING] The context menu at ${filePath} is missing a required "data" or "execute" property.`
			);
		}
	}
	return commands;
};
