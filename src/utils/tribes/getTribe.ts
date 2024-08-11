import { db } from "db";
import { APIResponse } from "typings";

export = async ({ tribeId }: { tribeId: string }): Promise<APIResponse> => {
	let tribe;
	try {
		tribe = await db.discordTribe.findUnique({ where: { id: tribeId } });
	} catch (e) {
		console.error(e);
		return { success: false, message: `${e}` };
	}

	return { success: true, message: `Found tribe`, data: tribe };
};
