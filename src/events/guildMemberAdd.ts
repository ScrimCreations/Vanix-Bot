import { Client, GuildMember, ActivityType } from "discord.js";

export = {
  name: "guildMemberAdd",
  once: false,

  async execute(member: GuildMember, client: Client) {
    // Update the activity to the amount of members in the server when a member joins
    client.user?.setActivity(`over ${client.guilds.cache.first()?.memberCount} members`, {
      type: ActivityType.Watching,
    });
  },
};
