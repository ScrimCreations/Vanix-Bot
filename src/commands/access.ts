import { SlashCommandBuilder } from "@discordjs/builders";
import {
  ChatInputCommandInteraction,
  SlashCommandSubcommandBuilder,
  EmbedBuilder,
  TextChannel,
  GuildMember,
  PermissionFlagsBits,
} from "discord.js";

type SubCommand = (interaction: ChatInputCommandInteraction) => Promise<void>;
type SubCommandMap = { [key: string]: SubCommand };

export const data = new SlashCommandBuilder()
  .setName("access")
  .setDescription("Access manager")
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
  .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
    subcommand
      .setName("accept")
      .setDescription("Accept a user")
      .addUserOption((option) =>
        option.setName("user").setDescription("The user to accept").setRequired(true)
      )
  )
  .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
    subcommand
      .setName("deny")
      .setDescription("Deny a user")
      .addUserOption((option) =>
        option.setName("user").setDescription("The user to deny").setRequired(true)
      )
      .addStringOption((option) =>
        option.setName("reason").setDescription("The reason for denying the user").setRequired(true)
      )
  );

export const accept: SubCommand = async (interaction: ChatInputCommandInteraction) => {
  const user = interaction.options.getUser("user", true);
  console.log(`User ${interaction.user.username} has accepted ${user.username}`);

  //#region Embed declaration
  const LogEmbed = new EmbedBuilder()
    .setTitle("Access request accepted")
    .setDescription(`User ${user.username} has been accepted`)
    .setColor("Green")
    .setFields([
      {
        name: "Accepted by",
        value: interaction.user.username,
        inline: true,
      },
      {
        name: "Accepted user",
        value: user.username,
        inline: true,
      },
    ])
    .setTimestamp();

  const ResponseEmbed = new EmbedBuilder()
    .setTitle("Access request accepted")
    .setDescription(`Your access request has been accepted`)
    .setFields([
      {
        name: "Server invite",
        value: process.env.SERVERINVITE!,
        inline: true,
      },
    ])
    .setColor("Green")
    .setTimestamp();

  //#endregion

  //#region give roles
  interaction.guild?.members.fetch(user.id).then((member: GuildMember) => {
    if (member.roles.cache.has(process.env.USERROLEID!)) {
      return;
    } else {
      member.roles.add(process.env.USERROLEID!);
    }
  });
  //#endregion

  //#region send embeds
  const logchannel = interaction.guild?.channels.cache.get(
    process.env.LOGCHANNELID!
  ) as TextChannel;
  logchannel.send({ embeds: [LogEmbed] });

  interaction.reply({ embeds: [ResponseEmbed] });
  //#endregion
};

export const deny: SubCommand = async (interaction: ChatInputCommandInteraction) => {
  const user = interaction.options.getUser("user", true);
  const reason = interaction.options.getString("reason", true);
  console.log(`User ${interaction.user.username} has denied ${user.username}`);

  //#region Embed declaration
  const LogEmbed = new EmbedBuilder()
    .setTitle("Access request denied")
    .setDescription(`User ${user.username} has been denied`)
    .setColor("Red")
    .setFields([
      {
        name: "Denied by",
        value: interaction.user.username,
        inline: true,
      },
      {
        name: "Denied user",
        value: user.username,
        inline: true,
      },
      {
        name: "Reason",
        value: `${reason}`,
        inline: true,
      },
    ])
    .setTimestamp();

  const ResponseEmbed = new EmbedBuilder()
    .setTitle("Access request Deined")
    .setDescription(`Your access request has been denied`)
    .setFields([
      {
        name: "Reason",
        value: `${reason}`,
        inline: true,
      },
    ])
    .setColor("Red")
    .setTimestamp();

  //#endregion

  //#region send embeds
  const logchannel = interaction.guild?.channels.cache.get(
    process.env.LOGCHANNELID!
  ) as TextChannel;
  logchannel.send({ embeds: [LogEmbed] });

  interaction.reply({ embeds: [ResponseEmbed] });
  //#endregion
};

export function execute(interaction: ChatInputCommandInteraction) {
  const subcommand = interaction.options.getSubcommand();

  const subcommandMap: SubCommandMap = {
    accept: accept,
    deny: deny,
  };

  subcommandMap[subcommand](interaction);
}
