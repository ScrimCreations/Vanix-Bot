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
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.deny = exports.accept = exports.data = void 0;
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
exports.data = new builders_1.SlashCommandBuilder()
    .setName("access")
    .setDescription("Access manager")
    .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.Administrator)
    .addSubcommand((subcommand) => subcommand
    .setName("accept")
    .setDescription("Accept a user")
    .addUserOption((option) => option.setName("user").setDescription("The user to accept").setRequired(true)))
    .addSubcommand((subcommand) => subcommand
    .setName("deny")
    .setDescription("Deny a user")
    .addUserOption((option) => option.setName("user").setDescription("The user to deny").setRequired(true))
    .addStringOption((option) => option.setName("reason").setDescription("The reason for denying the user").setRequired(true)));
const accept = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const user = interaction.options.getUser("user", true);
    console.log(`User ${interaction.user.username} has accepted ${user.username}`);
    //#region Embed declaration
    const LogEmbed = new discord_js_1.EmbedBuilder()
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
    const ResponseEmbed = new discord_js_1.EmbedBuilder()
        .setTitle("Access request accepted")
        .setDescription(`Your access request has been accepted`)
        .setFields([
        {
            name: "Server invite",
            value: process.env.SERVERINVITE,
            inline: true,
        },
    ])
        .setColor("Green")
        .setTimestamp();
    //#endregion
    //#region give roles
    (_a = interaction.guild) === null || _a === void 0 ? void 0 : _a.members.fetch(user.id).then((member) => {
        if (member.roles.cache.has(process.env.USERROLEID)) {
            return;
        }
        else {
            member.roles.add(process.env.USERROLEID);
        }
    });
    //#endregion
    //#region send embeds
    const logchannel = (_b = interaction.guild) === null || _b === void 0 ? void 0 : _b.channels.cache.get(process.env.LOGCHANNELID);
    logchannel.send({ embeds: [LogEmbed] });
    interaction.reply({ embeds: [ResponseEmbed] });
    //#endregion
});
exports.accept = accept;
const deny = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const user = interaction.options.getUser("user", true);
    const reason = interaction.options.getString("reason", true);
    console.log(`User ${interaction.user.username} has denied ${user.username}`);
    //#region Embed declaration
    const LogEmbed = new discord_js_1.EmbedBuilder()
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
    const ResponseEmbed = new discord_js_1.EmbedBuilder()
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
    const logchannel = (_c = interaction.guild) === null || _c === void 0 ? void 0 : _c.channels.cache.get(process.env.LOGCHANNELID);
    logchannel.send({ embeds: [LogEmbed] });
    interaction.reply({ embeds: [ResponseEmbed] });
    //#endregion
});
exports.deny = deny;
function execute(interaction) {
    const subcommand = interaction.options.getSubcommand();
    const subcommandMap = {
        accept: exports.accept,
        deny: exports.deny,
    };
    subcommandMap[subcommand](interaction);
}
exports.execute = execute;
