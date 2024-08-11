import { Client, Guild } from "discord.js";
import fetchAllCmds from "src/utils/commands/fetchAllCmds";
import refreshGuildCmds from "src/utils/guilds/refreshGuildCmds";
import registerGuild from "src/utils/guilds/registerGuild";

export = async (client: Client, guild: Guild) => {
	await registerGuild({ guildId: guild.id });

	await refreshGuildCmds({ client, guild, commands: await fetchAllCmds() });
};
