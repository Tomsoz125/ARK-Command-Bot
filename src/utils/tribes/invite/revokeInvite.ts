import { DiscordTribe } from "@prisma/client";
import { db } from "db";
import { Client, User } from "discord.js";
import { APIResponse } from "typings";

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
		invite = await db.discordTribeInvite.delete({
			where: {
				targetId_tribeId: { targetId: target.id, tribeId: tribe.id }
			}
		});
	} catch (e) {
		console.error(e);
		return { success: false, message: `${e}` };
	}

	if (!invite) {
		return {
			success: false,
			message: "Your tribe does not have an outgoing invte to that user!"
		};
	}

	return {
		success: true,
		message: `Successfully revoekd your outgoing invite to <@${target.id}>!`,
		data: invite
	};
};
