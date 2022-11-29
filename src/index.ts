import { Client, GatewayIntentBits, Collection } from "discord.js";
import env from "dotenv";
import { resolve } from "path";
import { readdirSync } from "fs";

env.config();

//#region ENV checks
if (!process.env.TOKEN) throw new Error("No token provided");
if (!process.env.SERVERINVITE) throw new Error("No server invite provided");
if (!process.env.OWNERID) throw new Error("No owner id provided");
if (!process.env.ADMINROLEID) throw new Error("No admin role id provided");
if (!process.env.MODROLEID) throw new Error("No mod role id provided");
if (!process.env.LOGCHANNELID) throw new Error("No log channel id provided");

const token = process.env.TOKEN;

//#endregion

//#region Client
declare module "discord.js" {
  interface Client {
    commands: Collection<unknown, any>;
    events: Collection<unknown, any>;
  }
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});
//#endregion

//#region commmand and events
client.commands = new Collection();
client.events = new Collection();

const commandFiles = readdirSync(resolve(__dirname, "commands")).filter((file) =>
  file.endsWith(".js")
);
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

const eventFiles = readdirSync(resolve(__dirname, "events")).filter((file) => file.endsWith(".js"));
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}
//#endregion

client.login(token);
