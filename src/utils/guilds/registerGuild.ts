import { db } from "db";
import { APIResponse } from "typings";

export = async ({ guildId }: { guildId: string }): Promise<APIResponse> => {
	try {
		var guild = await db.guild.create({
			data: {
				discordId: guildId
			}
		});
	} catch (e) {
		console.error(e);
		return { success: false, message: `${e}` };
	}
	return {
		success: true,
		message: `Successfully created a new guild object`,
		data: guild
	};
};
