import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import colours from "src/utils/colours";
import { CommandObject } from "typings";

export = {
	data: new SlashCommandBuilder()
		.setName("tribe")
		.setDescription("Allows users create and manage their own tribe")
		.addSubcommand((subcommand) =>
			subcommand
				.setName("create")
				.setDescription("Creates a new discord tribe")
				.addStringOption((option) =>
					option
						.setName("name")
						.setDescription("The name of the tribe")
						.setRequired(true)
						.setMinLength(1)
						.setMaxLength(24)
				)
				.addStringOption((option) =>
					option
						.setName("colour")
						.setDescription("The colour of the tribe's role")
						.addChoices(colours)
				)
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("leave")
				.setDescription("Leaves your current discord tribe")
		)
		.addSubcommandGroup((subcommand) =>
			subcommand
				.setName("invite")
				.setDescription("Invites a user to your current discord tribe")
				.addSubcommand((subcommand) =>
					subcommand
						.setName("send")
						.setDescription("Sends an invite to your current tribe")
						.addUserOption((option) =>
							option
								.setName("user")
								.setDescription(
									"The user to invite to the tribe"
								)
								.setRequired(true)
						)
				)
				.addSubcommand((subcommand) =>
					subcommand
						.setName("revoke")
						.setDescription("Revokes an invite to your tribe")
						.addUserOption((option) =>
							option
								.setName("user")
								.setDescription(
									"The user to revoke the invite from"
								)
								.setRequired(true)
						)
				)
		),
	botPermissions: [PermissionFlagsBits.ManageRoles],
	enabled: "enableTries",
	deleted: false
} as CommandObject;
