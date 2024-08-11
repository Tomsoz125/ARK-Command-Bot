import { ButtonObject } from "typings";

const path = require("path");
const getAllFiles = require("./getAllFiles");

export = (): ButtonObject[] => {
	let localMenus = [];

	for (const menu of [
		...getAllFiles(path.join(__dirname, "..", "buttons"))
	]) {
		localMenus.push(require(menu));
	}
	return localMenus;
};
