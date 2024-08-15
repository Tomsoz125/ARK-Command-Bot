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
import getCommandLink from "src/utils/getCommandLink";
import getTribeInvite from "src/utils/tribes/getTribeInvite";
import getUserTribe from "src/utils/tribes/getUserTribe";
import revokeInvite from "src/utils/tribes/invite/revokeInvite";

let name = "Revoke Invite";

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
			const currentInvite = await getTribeInvite({
				user: target,
				guild: interaction.guild!,
				tribe
			});

			if (!currentInvite.success) {
				return await interaction.editReply(
					getErrorEmbed(
						interaction as Interaction,
						name,
						`Your tribe doeesn't currently have an outgoing invite to that user! You can send one using ${await getCommandLink(
							{
								command: "/tribe invite send",
								guild: interaction.guild!
							}
						)}!`
					)
				);
			}

			const res = await revokeInvite({ tribe, client, target, user });
			if (!res.success) {
				return await interaction.editReply(
					getErrorEmbed(interaction as Interaction, name, res.message)
				);
			} else {
				return await interaction.editReply(
					getSuccessEmbed(
						interaction as Interaction,
						name,
						res.message
					)
				);
			}
		}
	}
};
