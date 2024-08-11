import { DiscordTribe } from "@prisma/client";
import { ButtonInteraction, Interaction } from "discord.js";
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

	callback: async (client, interaction: ButtonInteraction, tribeId) => {
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

		const member = await await joinTribe({
			member: interaction.member!,
			tribeId
		});
	}
} as ButtonObject;
