import { Client, Guild, REST, Routes } from "discord.js";
import { CommandObject } from "typings";
import checkCommandEnabled from "../commands/checkCommandEnabled";

export = ({
	client,
	commands,
	guild
}: {
	client: Client;
	commands: CommandObject[];
	guild: Guild;
}) => {
	const rest = new REST().setToken(process.env.BOT_TOKEN!);

	(async () => {
		try {
			console.log(
				`Started refreshing application (/) commands for guild ${guild.id}.`
			);
			let cmds = [];

			for (const cmd of commands) {
				const enabled = await checkCommandEnabled({
					commandObject: cmd,
					guildId: guild.id
				});
				if (enabled) cmds.push(cmd.data.toJSON());
			}

			const data: any = await rest.put(
				Routes.applicationGuildCommands(client.user!.id, guild.id),
				{
					body: cmds
				}
			);

			console.log(
				`Successfully reloaded ${data.length} application (/) commands for guild ${guild.id}.`
			);
		} catch (error) {
			// And of course, make sure you catch and log any errors!
			console.error(error);
		}
	})();
};
