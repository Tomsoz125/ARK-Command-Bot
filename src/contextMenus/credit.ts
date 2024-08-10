import {
	ApplicationCommandType,
	Client,
	ContextMenuCommandBuilder,
	ContextMenuCommandInteraction,
	Interaction
} from "discord.js";
import getErrorEmbed from "src/utils/embeds/getErrorEmbed";
import getSuccessEmbed from "src/utils/embeds/getSuccessEmbed";
import getStoreCredit from "src/utils/storeCredit/getStoreCredit";
import { ContextMenuObject } from "typings";

let name = "Store Credit";

export = {
	data: new ContextMenuCommandBuilder()
		.setName("Store Credit")
		.setType(ApplicationCommandType.User),

	callback: async (
		client: Client,
		interaction: ContextMenuCommandInteraction
	) => {
		const targetId = interaction.targetId;
		const guildId = interaction.guildId!;

		const credit = await getStoreCredit({
			userId: targetId,
			guildId
		});

		if (credit.success) {
			return await interaction.editReply(
				getSuccessEmbed(
					interaction as Interaction,
					name,
					credit.message
				)
			);
		} else {
			return await interaction.editReply(
				getErrorEmbed(interaction as Interaction, name, credit.message)
			);
		}
	}
} as ContextMenuObject;
