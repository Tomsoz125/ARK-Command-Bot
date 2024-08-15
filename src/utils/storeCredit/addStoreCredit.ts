import { db } from "db";
import { ModifyStoreCreditOptions } from "typings";
import getStoreCredit from "./getStoreCredit";

export = async ({
	adminId,
	amount,
	reason,
	userId,
	guildId
}: ModifyStoreCreditOptions) => {
	try {
		const guild = await db.guild.findUnique({
			where: { discordId: guildId }
		});
		if (!guild) {
			return {
				success: false,
				message:
					"I couldn't fetch the guild that you are in! Please try again."
			};
		}

		const expiresAt = new Date();
		expiresAt.setSeconds(expiresAt.getSeconds() + guild?.creditExpires);
		// Creates a log event
		await db.storeCreditLog.create({
			data: {
				amount,
				adminId,
				reason,
				guildId,
				timestamp: new Date(),
				expiresAt,
				userId
			}
		});
	} catch (e) {
		console.error(e);
		return { success: false, message: `${e}` };
	}

	const newAmount = await getStoreCredit({ userId, guildId });
	if (newAmount.success) {
		return {
			success: true,
			message: `Successfully added \`${amount}\` credit to <@${userId}>. They now have \`${newAmount.data}\` credit!`
		};
	} else {
		return {
			success: true,
			message: `Successfully added \`${amount}\` credit to <@${userId}>.`
		};
	}
};
