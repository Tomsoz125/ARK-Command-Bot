import { Client } from "discord.js";
import fetchAllCmds from "src/utils/commands/fetchAllCmds";
import refreshGuildCmds from "src/utils/guilds/refreshGuildCmds";

export = async (client: Client) => {
	const commands = fetchAllCmds();

	client.guilds.cache.forEach((g) =>
		refreshGuildCmds({ client, commands, guild: g })
	);
};
