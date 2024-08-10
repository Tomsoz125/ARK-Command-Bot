import {
	CacheType,
	Client,
	CommandInteraction,
	CommandInteractionOption,
	Interaction
} from "discord.js";
import getErrorEmbed from "src/utils/embeds/getErrorEmbed";
import getSuccessEmbed from "src/utils/embeds/getSuccessEmbed";
import addStoreCredit from "src/utils/storeCredit/addStoreCredit";
import { SubcommandObject } from "typings";

let name = "Add Credit";

export = {
	callback: async (
		client: Client,
		interaction: CommandInteraction,
		subcommand: CommandInteractionOption<CacheType>
	) => {
		if (subcommand.options && subcommand.options.length > 1) {
			const userId = subcommand.options[0].value as string;
			const amount = subcommand.options[1].value as number;
			const reason = (
				subcommand.options.length > 2
					? subcommand.options[2].value
					: "No reason given"
			) as string;
			const adminId = interaction.user.id;
			const guildId = interaction.guildId!;

			const response = await addStoreCredit({
				adminId,
				amount,
				guildId,
				userId,
				reason
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
					getErrorEmbed(
						interaction as Interaction,
						name,
						response.message
					)
				);
			}
		}
	}
} as SubcommandObject;
