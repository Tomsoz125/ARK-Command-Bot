import { DiscordTribe } from "@prisma/client";
import { ButtonInteraction, Client, Interaction } from "discord.js";
import getErrorEmbed from "src/utils/embeds/getErrorEmbed";
import getTribe from "src/utils/tribes/getTribe";
import joinTribe from "src/utils/tribes/joinTribe";
import { ButtonObject } from "typings";

const customId = "tribe-invite-accept-";
const name = "Join Tribe";

export = {
	data: {
		startsWith: true,
		customId,
		name
	},
	permissions: [],
	deferred: true,

	callback: async (
		client: Client,
		interaction: ButtonInteraction,
		tribeId
	) => {
		const user = interaction.user;
		const response = await getTribe({ tribeId });

		if (!response.success) {
			return await interaction.editReply(
				getErrorEmbed(
					interaction as Interaction,
					name,
					`This tribe has since been deleted!`
				)
			);
		}
		const tribe = response.data as DiscordTribe;
		const guild = await client.guilds.cache.f; // fetch the guild to get guildmember for funtion argument
		const res = await await joinTribe({
			member,
			tribeId
		});
	}
} as ButtonObject;
