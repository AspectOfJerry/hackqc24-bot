import {SlashCommandBuilder} from "@discordjs/builders";

export default {
    data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Stops the bot."),
    async execute(client, interaction) {
        if (interaction.user.id !== "611633988515266562") {
            return interaction.reply({content: "You do not have permission to use this command.", ephemeral: true});
        }

        await interaction.reply({content: ":warning: Stopping the bot..."});
        client.destroy().then(() => {
            process.exit();
        });
    }
}
