import {
	CacheType,
	Client,
	ColorResolvable,
	CommandInteraction,
	CommandInteractionOption,
	EmbedBuilder
} from "discord.js";
import getStoreCredit from "src/utils/storeCredit/getStoreCredit";
import removeStoreCredit from "src/utils/storeCredit/removeStoreCredit";
import { SubcommandObject } from "typings";
import { colours } from "../../../config.json";

let name = "Reset Credit";

export = {
	callback: async (
		client: Client,
		interaction: CommandInteraction,
		subcommand: CommandInteractionOption<CacheType>
	) => {
		if (subcommand.options && subcommand.options.length > 0) {
			const userId = subcommand.options[0].value as string;
			const adminId = interaction.user.id;
			const guildId = interaction.guildId!;

			const amount = await getStoreCredit({
				userId,
				guildId: interaction.guildId!
			});

			const reason = (
				subcommand.options.length > 2
					? subcommand.options[2].value
					: "No reason given"
			) as string;

			if (amount.success) {
				await removeStoreCredit({
					adminId,
					userId,
					reason,
					guildId,
					amount: amount.data
				});

				const embed = new EmbedBuilder()
					.setAuthor({
						name,
						iconURL:
							interaction.guild!.members.me!.displayAvatarURL()
					})
					.setDescription(`Reset <@${userId}>'s credit!`)
					.setColor(colours.success as ColorResolvable)
					.setTimestamp()
					.setFooter({
						// @ts-ignore
						text: `${interaction.user.displayName} • ${name}`,
						iconURL: interaction.guild!.iconURL() as string
					});
				return await interaction.editReply({ embeds: [embed] });
			}
		}
	}
} as SubcommandObject;
