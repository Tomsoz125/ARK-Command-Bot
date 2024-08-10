import { Prisma } from "@prisma/client";
import { db } from "db";
import { ColorResolvable, Guild, GuildMember } from "discord.js";
import { APIResponse } from "typings";

export = async ({
	member,
	name,
	colour,
	guild
}: {
	member: GuildMember;
	name: string;
	colour: string;
	guild: Guild;
}): Promise<APIResponse> => {
	// Checks if there is a role with that name or if there is a database object with that name
	const existing =
		(await guild.roles.cache.find((role) => role.name === name)) ||
		!!(await db.discordTribe.findUnique({
			where: { name, guildId: guild.id }
		}));

	// If so, fail out and say a tribe already exists.
	if (existing)
		return {
			success: false,
			message: "A tribe already exists with this name!"
		};

	// Creates the role before creating the database object as we need the role's id.
	const role = await guild.roles.create({
		color: colour as ColorResolvable,
		name,
		reason: "Tribe Creation",
		hoist: false,
		mentionable: true,
		position: 0
	});

	try {
		// Attempts to create the database object
		await db.discordTribe.create({
			data: {
				colour,
				name,
				users: [member.id],
				guildId: guild.id,
				roleId: role.id
			}
		});
	} catch (e) {
		// If prisma found duplicates, throw an error
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			return {
				success: false,
				message: "A tribe already exists with this name!"
			};
		}

		// Any other error, fail out and throw it
		console.error(e);
		return {
			success: false,
			message: "An unknown error has occurred!"
		};
	}

	// If the bot can manage the user
	if (member.manageable) {
		member.roles.add(role); // Give the user the tribe role
		return { success: true, message: "Successfully created your tribe!" }; // Send a success message
	} else {
		// If the bot can't manage the user, send error message
		return {
			success: false,
			message: "I don't have permission to give you roles!"
		};
	}
};