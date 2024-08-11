import { db } from "db";
import { APIResponse } from "typings";

export = async ({ guildId }: { guildId: string }): Promise<APIResponse> => {
	try {
		var guild = await db.guild.findUnique({
			where: { discordId: guildId }
		});
	} catch (e) {
		console.error(e);
		return { success: false, message: `${e}` };
	}
	if (!guild) {
		return {
			success: false,
			message: `Failed to find that guild`,
			data: guild
		};
	}
	return {
		success: true,
		message: `Successfully found that guild`,
		data: guild
	};
};
