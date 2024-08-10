import dotenv from "dotenv";
import cfg from "./config.json";

dotenv.config();

let { BOT_TOKEN, BOT_CLIENT } = process.env;

if (!BOT_TOKEN || !BOT_CLIENT) {
	throw new Error("Missing environment variables");
}

export const config = {
	BOT_TOKEN,
	BOT_CLIENT,
	sharding: cfg.sharding,
	colours: cfg.colours
};
