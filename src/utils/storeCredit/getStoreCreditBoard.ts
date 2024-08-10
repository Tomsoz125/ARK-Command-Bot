import { db } from "db";
import { APIResponse } from "typings";

export = async ({ guildId }: { guildId: string }): Promise<APIResponse> => {
	// Can include guild id in this check too if you want it to be global
	// TODO: Make toggle for it to be global per server collection

	// If it fails, return an error
	let creditLogs;
	try {
		creditLogs = await db.storeCreditLog.findMany({
			select: { userId: true, amount: true },
			where: { guildId }
		});
	} catch (e) {
		console.error(e);
		return { success: false, message: `${e}` };
	}

	// Creates variable totals which stores the total credit for each user
	const totals: { userId: string; total: number }[] = [];

	// Loops through every credit event
	for (const event of creditLogs) {
		// Create modified variable to see if any changes are made in second loop
		let modified = false;
		for (const index in totals) {
			// Loop through the stored totals
			const total = totals[index]; // Get the total we are currently at
			if (total.userId === event.userId) {
				// If the total is related to the current user
				modified = true; // Say we are going to modify to avoid repetitions
				totals.splice(parseInt(index), 1); // Remove the current total from the list
				total.total += event.amount; // Increase the total
				totals.push(total); // Store the new total
				break; // Prevent this loop from rerunning as we've already got what we need
			}
		}

		if (!modified)
			// If nothing was modified above then the user isn't in totals array yet, so add them.
			totals.push({ userId: event.userId, total: event.amount });
	}

	totals.sort((a, b) => b.total - a.total); // Sort the array

	return {
		success: true,
		message: `Successfully fetched`,
		data: totals.length > 10 ? totals.splice(0, 10) : totals
	};
};
