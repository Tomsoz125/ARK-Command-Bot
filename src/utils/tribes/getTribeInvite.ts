import { DiscordTribe } from "@prisma/client";
import { db } from "db";
import { Guild, User } from "discord.js";
import { APIResponse } from "typings";

export = async ({
	user,
	guild,
	tribe
}: {
	user: User;
	guild: Guild;
	tribe: DiscordTribe;
}): Promise<APIResponse> => {
	let invite;

	try {
		invite = await db.discordTribeInvite.findUnique({
			where: {
				targetId_tribeId: { targetId: user.id, tribeId: tribe.id }
			}
		});
	} catch (e) {
		console.error(e);
		return { success: false, message: `${e}` };
	}
	if (invite)
		return { success: true, message: "Found that invite", data: invite };
	else
		return {
			success: false,
			message: "Couldn't find that invite"
		};
};
