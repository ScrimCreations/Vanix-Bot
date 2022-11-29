"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = require("path");
const fs_1 = require("fs");
dotenv_1.default.config();
//#region ENV checks
if (!process.env.TOKEN)
    throw new Error("No token provided");
if (!process.env.SERVERINVITE)
    throw new Error("No server invite provided");
if (!process.env.OWNERID)
    throw new Error("No owner id provided");
if (!process.env.ADMINROLEID)
    throw new Error("No admin role id provided");
if (!process.env.MODROLEID)
    throw new Error("No mod role id provided");
if (!process.env.LOGCHANNELID)
    throw new Error("No log channel id provided");
const token = process.env.TOKEN;
const client = new discord_js_1.Client({
    intents: [discord_js_1.GatewayIntentBits.Guilds],
});
//#endregion
//#region commmand and events
client.commands = new discord_js_1.Collection();
client.events = new discord_js_1.Collection();
const commandFiles = (0, fs_1.readdirSync)((0, path_1.resolve)(__dirname, "commands")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}
const eventFiles = (0, fs_1.readdirSync)((0, path_1.resolve)(__dirname, "events")).filter((file) => file.endsWith(".js"));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    }
    else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}
//#endregion
client.login(token);
