import {
	CacheType,
	Client,
	CommandInteraction,
	CommandInteractionOption
} from "discord.js";

export = {
	callback: async (
		client: Client,
		interaction: CommandInteraction,
		subcommand: CommandInteractionOption<CacheType>
	) => {
		interaction.editReply("revoke");
	}
};
