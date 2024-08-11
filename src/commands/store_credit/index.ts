import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { CommandObject } from "typings";

export = {
	data: new SlashCommandBuilder()
		.setName("store_credit")
		.setDescription("Allows for management of store credit")
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("add")
				.setDescription("Adds store credit to a user")
				.addUserOption((option) =>
					option
						.setName("user")
						.setDescription("The user to give credit to")
						.setRequired(true)
				)
				.addNumberOption((option) =>
					option
						.setName("amount")
						.setDescription("The amount of credit to give")
						.setRequired(true)
				)
				.addStringOption((option) =>
					option
						.setName("reason")
						.setDescription("The reason for giving the credit")
				)
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("check")
				.setDescription("Check how much store credit a user has")
				.addUserOption((option) =>
					option
						.setName("user")
						.setDescription("The user to check the credit of")
						.setRequired(true)
				)
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("remove")
				.setDescription("Removes store credit from a user")
				.addUserOption((option) =>
					option
						.setName("user")
						.setDescription("The user to remove credit from")
						.setRequired(true)
				)
				.addNumberOption((option) =>
					option
						.setName("amount")
						.setDescription("The amount of credit to take")
						.setRequired(true)
				)
				.addStringOption((option) =>
					option
						.setName("reason")
						.setDescription("The reason for taking the credit")
				)
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("reset")
				.setDescription("Removes all of a user's store credit")
				.addUserOption((option) =>
					option
						.setName("user")
						.setDescription("The user to reset credit for")
						.setRequired(true)
				)
				.addStringOption((option) =>
					option
						.setName("reason")
						.setDescription("The reason for resetting the credit")
				)
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("leaderboard")
				.setDescription("Shows a leaderboard for store credit")
		),
	botPermissions: [],
	enabled: "enableCredit",
	deleted: false
} as CommandObject;
