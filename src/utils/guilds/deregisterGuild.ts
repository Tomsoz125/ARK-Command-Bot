import { db } from "db";
import { APIResponse } from "typings";

export = async ({ guildId }: { guildId: string }): Promise<APIResponse> => {
	try {
		var guild = await db.guild.delete({ where: { discordId: guildId } });
	} catch (e) {
		console.error(e);
		return { success: false, message: `${e}` };
	}
	return {
		success: true,
		message: `Successfully deleted guild object`,
		data: guild
	};
};
