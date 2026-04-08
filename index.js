require("http").createServer((req, res) => {
  res.end("Bot alive");
}).listen(3000);

console.log("arrancando...");
const { Client, GatewayIntentBits } = require('discord.js');
const util = require('minecraft-server-util');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

const TOKEN = process.env.TOKEN;
const CHANNEL_ID = "1486371055382564954";

const HOST = "sv21.minehost.pro";
const PORT = 25575;

client.once('ready', () => {
    console.log(`Bot listo como ${client.user.tag}`);

        setInterval(async () => {
            console.log(`intentando actualizarr`);

        try {
            const status = await util.status(HOST, PORT);

            const online = status.players.online;

            let emoji = "🟢";
            if (online === 0) emoji = "🟡";

            const channel = await client.channels.fetch(CHANNEL_ID);

            await channel.setName(`${emoji} 𝘫𝘶𝘨𝘢𝘥𝘰𝘳𝘢𝘴 — ${online}`);

        } catch (err) {
            console.log("ERROR:", err);

            const channel = await client.channels.fetch(CHANNEL_ID);
            await channel.setName(`🔴 𝘰𝘧𝘧𝘭𝘪𝘯𝘦`);
        }
    }, 10000);
});

client.login(TOKEN);