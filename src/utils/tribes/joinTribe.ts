import { JsonObject } from "@prisma/client/runtime/library";
import { db } from "db";
import { GuildMember } from "discord.js";
import { APIResponse } from "typings";
import getCommandLink from "../getCommandLink";
import getUserTribe from "./getUserTribe";

export = async ({
	member,
	tribeId
}: {
	member: GuildMember;
	tribeId: string;
}): Promise<APIResponse> => {
	const currentTribe = await getUserTribe({ member });
	if (currentTribe.success) {
		return {
			success: false,
			message: `You need to leave your current tribe before you can join a new one.\n${await getCommandLink(
				{ command: "/tribe leave", guild: member.guild }
			)}`
		};
	}

	let tribe;

	try {
		tribe = await db.discordTribe.update({
			where: { id: tribeId },
			data: { users: { push: member.id } }
		});
	} catch (e) {
		console.error(e);
		return { success: false, message: `${e}` };
	}

	// If the bot can manage the user
	if (member.manageable) {
		let roles = tribe.tribeDiscordRoleInfo as JsonObject[];
		roles = roles.filter((value) => value.guildId === member.guild.id);
		if (roles.length > 0)
			member.roles.add(roles[0].roleId as string, "Tribe"); // Give the user the tribe role
		return {
			success: true,
			message: "Successfully added you to the tribe!"
		}; // Send a success message
	} else {
		// If the bot can't manage the user, send error message
		return {
			success: false,
			message: "I don't have permission to give you roles!"
		};
	}
};
