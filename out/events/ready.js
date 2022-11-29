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
const discord_js_1 = require("discord.js");
module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Ready!");
            // set the activity to the amount of members in the server
            (_a = client.user) === null || _a === void 0 ? void 0 : _a.setActivity(`over ${(_b = client.guilds.cache.first()) === null || _b === void 0 ? void 0 : _b.memberCount} members`, {
                type: discord_js_1.ActivityType.Watching,
            });
        });
    },
};
