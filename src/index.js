import { Client, GatewayIntentBits, PermissionFlagsBits } from "discord.js";
import config from "../config.json" assert { type: "json" };

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent,
    ],
});

function hasUniqueEmoji(emoji) {
    // Emojis in https://bleed.rip/ quick polls
    const unqiueEmojis = ["◀️", "▶️", "⬆️", "⬇️"];

    for (const unqiueEmoji of unqiueEmojis) {
        if (emoji.name === unqiueEmoji) return true;
    }

    return false;
}

client.on("messageReactionAdd", async (reaction, user) => {
    const message = reaction.message;
    const member = message.member;

    if (!member || member.bot) return;
    // My discord id
    if (member.id === "348595558468026369") return;
    if (member.permissions.has(PermissionFlagsBits.ManageMessages)) return;
    if (message.author.id !== user.id) return;
    if (hasUniqueEmoji(reaction.emoji)) return;

    reaction.users.remove(member.id);
});

client.on("ready", async () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.login(config.token);
