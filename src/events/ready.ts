import { Client, ActivityType } from "discord.js";

export = {
  name: "ready",
  once: true,

  async execute(client: Client) {
    console.log("Ready!");
    // set the activity to the amount of members in the server
    client.user?.setActivity(`over ${client.guilds.cache.first()?.memberCount} members`, {
      type: ActivityType.Watching,
    });
  },
};
