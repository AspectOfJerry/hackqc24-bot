import {exec} from "child_process";
import {SlashCommandBuilder} from "@discordjs/builders";

export default {
    data: new SlashCommandBuilder()
    .setName("runpython")
    .setDescription("Run python."),
    async execute(client, interaction) {
        exec("python ./scripts/hello.py", (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                interaction.reply({content: `*exec error:* ${error}`});
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
            interaction.reply({content: `*stdout:* ${stdout}\n*stderr:* ${stderr}`});
        });
    }
};
