import { db } from "db";
import { CommandObject } from "typings";

export = async ({
	commandObject,
	guildId
}: {
	commandObject: CommandObject;
	guildId: string;
}) => {
	const dbGuild = await db.guild.findUnique({
		where: { discordId: guildId }
	});
	if (commandObject.data.name === "tribe" && !dbGuild?.enableTribes) {
		return false;
	}
	if (
		(commandObject.data.name === "credit" ||
			commandObject.data.name === "store_credit" ||
			commandObject.data.name === "Store Credit") &&
		!dbGuild?.enableCredit
	) {
		return false;
	}
	if (
		commandObject.data.name === "cluster_alpha" &&
		!dbGuild?.enableClusterAlpha
	) {
		return false;
	}
	if (commandObject.data.name === "ticket" && !dbGuild?.enableTickets) {
		return false;
	}
	return true;
};
