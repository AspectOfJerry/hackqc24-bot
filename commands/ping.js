import {Colors, EmbedBuilder} from "discord.js";
import {SlashCommandBuilder} from "@discordjs/builders";

export default {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Displays the client latency and the WebSocket server latency."),
    async execute(client, interaction) {
        interaction.channel.send({content: "ping..."})
        .then((pingMessage) => {
            pingMessage.delete().catch(console.error);

            const pong = new EmbedBuilder()
            .setColor(Colors.Green)
            .setTitle("Pong!")
            .addFields([
                {name: "Client latency", value: `~${pingMessage.createdTimestamp - interaction.createdTimestamp}ms`, inline: true},
                {name: "WebSocket", value: `~${client.ws.ping}ms | status: \`${interaction.client.ws.status}\``, inline: true}
            ]);

            interaction.reply({embeds: [pong]});
        });
    }
}
