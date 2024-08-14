import {
	CacheType,
	Client,
	CommandInteraction,
	CommandInteractionOption,
	GuildMember,
	Interaction
} from "discord.js";
import colours from "src/utils/colours";
import getErrorEmbed from "src/utils/embeds/getErrorEmbed";
import getSuccessEmbed from "src/utils/embeds/getSuccessEmbed";
import getCommandLink from "src/utils/getCommandLink";
import randomNumber from "src/utils/randomNumber";
import createTribe from "src/utils/tribes/createTribe";
import getUserTribe from "src/utils/tribes/getUserTribe";

const cols = colours;

let name = "Create Tribe";

export = {
	callback: async (
		client: Client,
		interaction: CommandInteraction,
		subcommand: CommandInteractionOption<CacheType>
	) => {
		if (subcommand.options && subcommand.options.length > 0) {
			const member = interaction.member! as GuildMember;
			const existingTribe = await getUserTribe({
				member: interaction.member as GuildMember
			});
			if (existingTribe.success) {
				return await interaction.editReply(
					getErrorEmbed(
						interaction as Interaction,
						name,
						`You need to leave your current tribe before you can make a new one!\n${await getCommandLink(
							{
								command: "/tribe leave",
								guild: interaction.guild!
							}
						)}`
					)
				);
			}
			const tribeName = subcommand.options[0].value as string;
			const colour =
				(subcommand.options[1]?.value as string) ||
				cols[randomNumber(0, cols.length - 1)].value;

			const response = await createTribe({
				// TODO: Eventually check this against a banned word list
				// TODO: Make sure you aren't already in a tribe before making a new one
				member,
				colour,
				name: tribeName,
				guild: interaction.guild!
			});

			if (!response.success) {
				return await interaction.editReply(
					getErrorEmbed(
						interaction as Interaction,
						name,
						response.message
					)
				);
			} else {
				return await interaction.editReply(
					getSuccessEmbed(
						interaction as Interaction,
						name,
						response.message
					)
				);
			}
		}
	}
};
