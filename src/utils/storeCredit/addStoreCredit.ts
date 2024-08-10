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
		// Creates a log event
		await db.storeCreditLog.create({
			data: {
				amount,
				adminId,
				reason,
				guildId,
				timestamp: new Date(),
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
