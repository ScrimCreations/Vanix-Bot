import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

export const data = new SlashCommandBuilder().setName("ping").setDescription("Replies with Pong!");
export function execute(interaction: CommandInteraction) {
  console.log(`User ${interaction.user.username} has used the ping command`);

  return interaction.reply({ content: "pong", ephemeral: true });
}
