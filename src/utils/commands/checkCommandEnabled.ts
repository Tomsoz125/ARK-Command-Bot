import { db } from "db";
import { ButtonObject, CommandObject, ContextMenuObject } from "typings";

const defaultValue = false;

export = async ({
	commandObject,
	guildId
}: {
	commandObject: CommandObject | ContextMenuObject | ButtonObject;
	guildId: string;
}) => {
	const dbGuild = await db.guild.findUnique({
		where: { discordId: guildId }
	});
	let enabled = commandObject.enabled || defaultValue;
	if (typeof enabled === "boolean") {
		return enabled;
	}
	enabled = enabled as keyof typeof dbGuild;
	if (!dbGuild || !(enabled in dbGuild)) {
		return defaultValue;
	}
	const enabledDb: any = dbGuild[enabled];
	return enabledDb;
};
