import { Guild, SlashCommandBuilder } from "discord.js";

export interface CommandOptionChoice {
	name: string;
	value: string;
}

export interface CommandOption {
	name: string;
	description: string;
	type: ApplicationCommandOptionType;
	choices?: CommandOptionChoice[] = [];
	required?: boolean = false;
}

export interface CommandSubCommand {
	name: string;
	description: string;
	type: ApplicationCommandOptionType;
	options?: CommandOption[] = [];
}

export interface CommandObject {
	data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;
	botPermissions?: bigint[] = [];
	deleted?: boolean = false;
	deferred?: boolean = true;
	callback?: (
		client: Client,
		interaction: CommandInteraction & { guild: Guild },
		...args
	) => unknown;
}

export interface SubcommandObject {
	callback: (
		client: Client,
		interaction: CommandInteraction & { guild: Guild },
		subcommand: CommandInteractionOption<CacheType>,
		...args
	) => unknown;
}

export interface ModifyStoreCreditOptions {
	userId: string;
	amount: number;
	adminId: string;
	reason: string;
	guildId: string;
}

export interface ContextMenuObject {
	data: ContextMenuCommandBuilder;
	deferred?: boolean = true;
	botPermissions?: bigint[] = [];
	callback: (
		client: Client,
		interaction: ContextMenuCommandInteraction
	) => unknown;
}

export interface APIResponse {
	success: boolean;
	message: string;
	data?: any;
}

export interface ButtonData {
	startsWith?: boolean = true;
	customId: string;
	name: string;
}

export interface ButtonObject {
	data: ButtonData;
	permissions?: bigint[] = [];
	deferred?: boolean = true;
	callback: (
		client: Client,
		interaction: ButtonInteraction,
		argument: string
	) => unknown;
}
