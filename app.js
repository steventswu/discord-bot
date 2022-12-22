require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");
const { aiAssistant } = require("./services/openai");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (msg) => {
  console.log("使用者發送的訊息：", msg.content);
  console.log(msg);
  if (msg.author.bot) return; // 避免機器人互相回覆
  if (msg.channelId !== process.env.DISCORD_CHANNEL_ID) return;
  const response = await aiAssistant(msg.content);
  msg.reply(response);
});

client.login(process.env.DISCORD_BOT_TOKEN);
