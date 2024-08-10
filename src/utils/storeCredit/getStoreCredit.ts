import { db } from "db";
import { APIResponse } from "typings";

export = async ({
	userId,
	guildId
}: {
	userId: string;
	guildId: string;
}): Promise<APIResponse> => {
	// Can include guild id in this check too if you want it to be global
	// TODO: Make toggle for it to be global per server collection
	// TODO: Add checks in this and board function to see if credit has expired

	// Finds all log events for the user
	const creditLogs = await db.storeCreditLog.findMany({
		where: { userId }
	});

	// Totals the logs to get the users current credit
	let total = 0;
	creditLogs.forEach((log) => {
		total += log.amount;
	});

	return {
		success: true,
		data: total,
		message: `<@${userId}> has \`${total}\` credit!`
	};
};
