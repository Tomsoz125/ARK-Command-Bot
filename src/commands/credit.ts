import {
	Client,
	CommandInteraction,
	Interaction,
	SlashCommandBuilder
} from "discord.js";
import getSuccessEmbed from "src/utils/embeds/getSuccessEmbed";
import getUnexpectedErrorEmbed from "src/utils/embeds/getUnexpectedErrorEmbed";
import getStoreCredit from "src/utils/storeCredit/getStoreCredit";
import { CommandObject } from "typings";

let name = "Store Credit";

export = {
	data: new SlashCommandBuilder()
		.setName("credit")
		.setDescription("Allows users to check their credit balance"),
	botPermissions: [],
	enabled: "enableCredit",
	deleted: false,

	callback: async (client: Client, interaction: CommandInteraction) => {
		const userId = interaction.user.id;
		const guildId = interaction.guildId!;
		const response = await getStoreCredit({
			userId,
			guildId
		});

		if (response.success) {
			return await interaction.editReply(
				getSuccessEmbed(
					interaction as Interaction,
					name,
					response.message
				)
			);
		} else {
			return await interaction.editReply(
				getUnexpectedErrorEmbed(interaction as Interaction, name)
			);
		}
	}
} as CommandObject;
