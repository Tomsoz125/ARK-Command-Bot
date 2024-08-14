import { Guild } from "discord.js";

export = async ({ command, guild }: { command: string; guild: Guild }) => {
	const commandName =
		command.split(" ").length > 0
			? command.split(" ")[0].slice(1)
			: command.slice(1);
	const commands = await guild.commands.fetch();
	const cmds = commands.filter((cmd) => cmd.name === commandName);
	return cmds.size > 0
		? `<${command}:${cmds.at(0)!.id}>`
		: "Error, could not find the command requested!";
};
