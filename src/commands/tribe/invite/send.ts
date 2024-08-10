import {
	CacheType,
	Client,
	CommandInteraction,
	CommandInteractionOption,
	GuildMember,
	Interaction
} from "discord.js";
import getErrorEmbed from "src/utils/embeds/getErrorEmbed";
import getSuccessEmbed from "src/utils/embeds/getSuccessEmbed";
import getUserTribe from "src/utils/tribes/getUserTribe";
import inviteToTribe from "src/utils/tribes/inviteToTribe";

let name = "Invite User";

export = {
	callback: async (
		client: Client,
		interaction: CommandInteraction,
		subcommand: CommandInteractionOption<CacheType>
	) => {
		if (subcommand.options && subcommand.options.length > 0) {
			const user = interaction.user;
			const tribeResponse = await getUserTribe({
				member: interaction.member as GuildMember
			});
			const targetId = subcommand.options[0].value as string;
			const target = await client.users.cache.find(
				(user) => user.id === targetId
			);
			if (!target)
				return await interaction.editReply(
					getErrorEmbed(
						interaction as Interaction,
						name,
						"Failed to fetch that user, please try again!"
					)
				);

			if (!tribeResponse.success) {
				return await interaction.editReply(
					getErrorEmbed(
						interaction as Interaction,
						name,
						"You aren't currently in a tribe!"
					)
				);
			}
			const tribe = tribeResponse.data;

			const response = await inviteToTribe({
				tribe,
				user,
				target,
				client
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
