import {Client, GatewayIntentBits} from "discord.js";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

// Create a new client instance
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});

client.commands = new Map();

(async () => {
    // Read command files
    const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

    // Loop through each file and set commands to our command collection
    for (const file of commandFiles) {
        const command = await import(`./commands/${file}`);
        client.commands.set(command.default.data.name, command.default);
    }

    console.log("Registered commands", commandFiles);

    // Read event files
    const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));

    // Loop through each file and register the event with the client
    for (const file of eventFiles) {
        const event = await import(`./events/${file}`);
        if (event.default.once) {
            client.once(event.default.name, (...args) => event.default.execute(client, ...args));
        } else {
            client.on(event.default.name, (...args) => event.default.execute(client, ...args));
        }
    }

    console.log("Registered events", eventFiles);
    await client.login(process.env.DISCORD_BOT_TOKEN);
})();
