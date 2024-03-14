import {SlashCommandBuilder} from "@discordjs/builders";

export default {
    data: new SlashCommandBuilder()
    .setName("send")
    .setDescription("Sends a TTS message.")
    .addStringOption((option) =>
        option.setName("message")
        .setDescription("The message to send.")
        .setRequired(true)),
    async execute(client, interaction) {
        const message = interaction.options.getString("message");
        await interaction.reply({content: "Sending TTS message...", ephemeral: true});
        interaction.channel.send({content: message, tts: true})
        .then(() => interaction.deleteReply());
    }
}
