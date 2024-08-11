import { Client, Guild } from "discord.js";
import deregisterGuild from "src/utils/guilds/deregisterGuild";

export = async (client: Client, guild: Guild) => {
	await deregisterGuild({ guildId: guild.id });
};
