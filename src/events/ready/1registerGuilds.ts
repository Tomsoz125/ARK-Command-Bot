import { Client } from "discord.js";
import findGuildByDiscordId from "src/utils/guilds/findGuildByDiscordId";
import registerGuild from "src/utils/guilds/registerGuild";

export = async (client: Client) => {
	for (const g of client.guilds.cache) {
		const guild = g[1];
		const dbGuild = await findGuildByDiscordId({ guildId: guild.id });
		if (!dbGuild.success) {
			await registerGuild({ guildId: guild.id });
		}
	}
};
