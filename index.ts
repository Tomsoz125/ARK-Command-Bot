import { config } from "config";

if (config.sharding.enabled) {
	require("./src/sharding");
} else {
	require("./src/bot");
}

// make /config command with things like reset all for storeCredit, how long before storeCredit expires, ticket channel prefix
// add ability to make clusters of discord servers

// tribe system available to all users, ca is based off of tribe system
