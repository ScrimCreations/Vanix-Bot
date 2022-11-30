"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
if (!process.env.TOKEN)
    throw new Error("TOKEN is not defined in the .env file");
if (!process.env.CLIENT_ID)
    throw new Error("CLIENT_ID is not defined in the .env file");
if (!process.env.GUILD_ID)
    throw new Error("GUILD_ID is not defined in the .env file");
const rest = new discord_js_1.REST({ version: "9" }).setToken(process.env.TOKEN);
const commands = [];
// Place your client and guild ids here
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
const commandFiles = fs_1.default
    .readdirSync((0, path_1.resolve)(__dirname, "commands"))
    .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}
// update the refesh and deploy commands
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Started refreshing application (/) commands.");
        yield rest.put(discord_js_1.Routes.applicationGuildCommands(clientId, guildId), {
            body: commands,
        });
        console.log("Successfully reloaded application (/) commands.");
    }
    catch (error) {
        console.error(error);
    }
}))();
