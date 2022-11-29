"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.data = void 0;
const builders_1 = require("@discordjs/builders");
exports.data = new builders_1.SlashCommandBuilder().setName("ping").setDescription("Replies with Pong!");
function execute(interaction) {
    console.log(`User ${interaction.user.username} has used the ping command`);
    return interaction.reply({ content: "pong", ephemeral: true });
}
exports.execute = execute;
