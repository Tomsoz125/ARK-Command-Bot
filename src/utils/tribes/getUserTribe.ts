import { db } from "db";
import { GuildMember } from "discord.js";
import { APIResponse } from "typings";

export = async ({ member }: { member: GuildMember }): Promise<APIResponse> => {
	let tribe;
	try {
		tribe = await db.discordTribe.findFirst({
			where: { users: { has: member.id } }
		});
	} catch (e) {
		console.error(e);
		return { success: false, message: `${e}` };
	}

	if (!tribe) {
		return { success: false, message: `That user is not in a tribe!` };
	}

	return { success: true, message: `Found tribe`, data: tribe };
};
