import {
	CacheType,
	Client,
	ColorResolvable,
	CommandInteraction,
	CommandInteractionOption,
	EmbedBuilder
} from "discord.js";
import getStoreCreditBoard from "src/utils/storeCredit/getStoreCreditBoard";
import { SubcommandObject } from "typings";
import { colours } from "../../../config.json";

let name = "Credit Leaderboard";

export = {
	callback: async (
		client: Client,
		interaction: CommandInteraction,
		subcommand: CommandInteractionOption<CacheType>
	) => {
		const guild = interaction.guild!;
		const board = await getStoreCreditBoard({ guildId: guild.id });
		let description = ``;
		for (const i in board.data) {
			const user = board.data[i];
			if (user.total <= 0) continue;
			if (description === "")
				description += `**${parseInt(i) + 1}. **<@${
					user.userId
				}> has \`${user.total}\` credits`;
			else {
				description += `\n**${parseInt(i) + 1}. **<@${
					user.userId
				}> has \`${user.total}\` credits`;
			}
		}
		if (description === "") description = "Nobody has any credits!";

		const embed = new EmbedBuilder()
			.setAuthor({
				name: "Credit Leaderboard",
				iconURL: interaction.guild!.members.me!.displayAvatarURL()
			})
			.setDescription(description)
			.setColor(colours.success as ColorResolvable)
			.setTimestamp()
			.setFooter({
				// @ts-ignore
				text: `${interaction.user.displayName} • ${name}`,
				iconURL: interaction.guild!.iconURL() as string
			});
		await interaction.editReply({ embeds: [embed] });
	}
} as SubcommandObject;
