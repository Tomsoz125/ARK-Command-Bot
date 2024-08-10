import { db } from "db";
import { APIResponse, ModifyStoreCreditOptions } from "typings";
import getStoreCredit from "./getStoreCredit";

export = async ({
	adminId,
	amount,
	reason,
	userId,
	guildId
}: ModifyStoreCreditOptions): Promise<APIResponse> => {
	try {
		// Creates a log event, with a negative before the amount to signify removal.
		await db.storeCreditLog.create({
			data: {
				amount: parseFloat(`-${amount}`),
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
			message: `Successfully removed \`${amount}\` credit from <@${userId}>. They now have \`${newAmount.data}\` credit!`
		};
	} else {
		return {
			success: true,
			message: `Successfully remobved \`${amount}\` credit from <@${userId}>.`
		};
	}
};
