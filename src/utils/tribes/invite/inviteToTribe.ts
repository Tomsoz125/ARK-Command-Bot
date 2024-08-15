import { DiscordTribe, Prisma } from "@prisma/client";
import { db } from "db";
import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	Client,
	ColorResolvable,
	EmbedBuilder,
	User
} from "discord.js";
import { APIResponse } from "typings";
import { colours } from "../../../../config.json";
import getCommandLink from "../../getCommandLink";

export = async ({
	tribe,
	client,
	target,
	user
}: {
	client: Client;
	tribe: DiscordTribe;
	target: User;
	user: User;
}): Promise<APIResponse> => {
	let invite;

	try {
		invite = await db.discordTribeInvite.create({
			data: { targetId: target.id, userId: user.id, tribeId: tribe.id }
		});
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			const guilds = await client.guilds.fetch();
			const guild = await guilds
				.find((g) => g.id === tribe.guildId)!
				.fetch();
			return {
				success: false,
				message: `Your tribe already has an outgoing invitation to this user!\nYou can use ${await getCommandLink(
					{ command: "/tribe invite revoke", guild }
				)} to revoke the invite.`
			};
		}

		console.error(e);
		return { success: false, message: `${e}` };
	}

	try {
		let guild = await client.guilds.cache.find(
			(guild) => guild.id === tribe.guildId
		);
		let guildIcon = guild!.iconURL();
		if (!guildIcon) guildIcon = client.user!.displayAvatarURL();
		const embed = new EmbedBuilder()
			.setAuthor({
				name: "Tribe Invitation",
				iconURL: guildIcon
			})
			.setDescription(
				`You have been invited to join the tribe \`${tribe.name}\`${
					guild ? `in the server \`${guild.name}\`` : ""
				}!`
			)
			.setColor(colours.success as ColorResolvable)
			.setTimestamp()
			.setFooter({
				// @ts-ignore
				text: `${target.displayName} • Tribe Invitation`,
				iconURL: target.displayAvatarURL() as string
			});

		const row = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setLabel("Accept Invite")
				.setCustomId(`tribe-invite-accept-${tribe.id}`)
				.setStyle(ButtonStyle.Success)
				.setEmoji("✅"),
			new ButtonBuilder()
				.setLabel("Decline Invite")
				.setCustomId(`tribe-invite-decline-${tribe.id}`)
				.setStyle(ButtonStyle.Danger)
				.setEmoji("⛔")
		);

		// @ts-ignore
		await target.send({ embeds: [embed], components: [row] });
		return {
			success: true,
			message: `Successfully invited <@${target.id}> to join your tribe!`,
			data: invite
		};
	} catch (e: any) {
		if (e!.code === 50007) {
			return {
				success: false,
				message: `I couldn't send the invite to that user. The invite has been logged and they can use the command \`/tribe join ${tribe.name}\` to join the tribe.`,
				data: invite
			};
		}
		console.error(e);
		return {
			success: false,
			message: `An unexpected error occurred while sending the message: \`${e}\`\nThey can still join the tribe using the command \`/tribe join ${tribe.name}\`!`,
			data: invite
		};
	}
};
