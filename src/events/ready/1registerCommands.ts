import {
	Client,
	REST,
	RESTPostAPIChatInputApplicationCommandsJSONBody,
	Routes
} from "discord.js";
import fs from "fs";
import path from "path";
import { CommandObject, ContextMenuObject } from "typings";

const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

export = async (client: Client) => {
	const foldersPath = path.join(__dirname, "../../commands");
	const commandFolders = fs.readdirSync(foldersPath);
	for (const folder of commandFolders) {
		if (folder.endsWith(".ts")) {
			const filePath = path.join(foldersPath, folder);
			const command: CommandObject = require(filePath);
			if ("data" in command && "callback" in command) {
				command.data = command.data.setDMPermission(false);
				commands.push(command.data.toJSON());
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
			commands.push(command.data.toJSON());
		}
	}

	const contextMenuPath = path.join(__dirname, "../../contextMenus");
	const contextFiles = fs.readdirSync(contextMenuPath);
	for (const file of contextFiles) {
		const filePath = path.join(contextMenuPath, file);
		const command: ContextMenuObject = require(filePath);
		if ("data" in command && "callback" in command) {
			command.data = command.data.setDMPermission(false);
			commands.push(command.data.toJSON());
		} else {
			console.log(
				`[WARNING] The context menu at ${filePath} is missing a required "data" or "execute" property.`
			);
		}
	}
	// Construct and prepare an instance of the REST module
	const rest = new REST().setToken(process.env.BOT_TOKEN!);

	// and deploy your commands!
	(async () => {
		try {
			console.log(
				`Started refreshing ${commands.length} application (/) commands.`
			);

			// The put method is used to fully refresh all commands in the guild with the current set
			const data: any = await rest.put(
				Routes.applicationCommands(client.user!.id),
				{ body: commands }
			);

			console.log(
				`Successfully reloaded ${data.length} application (/) commands.`
			);
		} catch (error) {
			// And of course, make sure you catch and log any errors!
			console.error(error);
		}
	})();
};
