import {RemoteRunnable} from "@langchain/core/runnables/remote";
import {SlashCommandBuilder} from "@discordjs/builders";

export default {
    data: new SlashCommandBuilder()
    .setName("invoke")
    .setDescription("Invoke a chain. big gaming time")
    .addStringOption((option) =>
        option.setName("prompt")
        .setDescription("The prompt.")
        .setRequired(true)),
    async execute(client, interaction, message) { // message parameter coming from events/messageCreate.js
        if (typeof message == "undefined") await interaction.deferReply();

        const prompt = interaction?.options?.getString("prompt") || interaction;

        const chain = new RemoteRunnable({
            url: "http://localhost:8000/chain/",
        });

        const result = await chain.invoke(prompt);

        if (typeof message == "undefined") return await interaction.editReply({
            content: `### ${(interaction.user.displayName || interaction.user.username) + ": " + prompt}\n` + result.content
        });
        else await message.reply({content: result.content});
    }
};
