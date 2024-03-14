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
            url: `http://localhost:8000/main/`,
        });

        const add_human_message = new RemoteRunnable({
            url: `http://localhost:8000/add_human_message/`,
        });

        const add_ai_message = new RemoteRunnable({
            url: `http://localhost:8000/add_ai_message/`,
        });

        const username = interaction?.user?.displayName || message?.author?.displayName;

        const result = await chain.invoke({role: username, content: prompt});
        await add_human_message.invoke({role: username, content: prompt});

        if (typeof message == "undefined") {
            await interaction.editReply({
                content: `### ${(username) + ": " + prompt}\n` + result.content
            }).then((msg) => {
                add_ai_message.invoke({content: msg.content});
            });
        } else {
            await message.reply({content: result.content})
            .then((msg) => {
                add_ai_message.invoke({content: msg.content});
            });
        }
    }
}
