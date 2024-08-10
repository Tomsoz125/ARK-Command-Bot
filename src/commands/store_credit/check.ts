import {
	CacheType,
	Client,
	CommandInteraction,
	CommandInteractionOption,
	Interaction
} from "discord.js";
import getErrorEmbed from "src/utils/embeds/getErrorEmbed";
import getSuccessEmbed from "src/utils/embeds/getSuccessEmbed";
import getStoreCredit from "src/utils/storeCredit/getStoreCredit";
import { SubcommandObject } from "typings";

let name = "Check Credit";
export = {
	callback: async (
		client: Client,
		interaction: CommandInteraction,
		subcommand: CommandInteractionOption<CacheType>
	) => {
		if (subcommand.options && subcommand.options.length > 0) {
			const userId = subcommand.options[0].value as string;

			const response = await getStoreCredit({
				userId,
				guildId: interaction.guildId!
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
