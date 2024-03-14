import invokechain from "../commands/invokechain.js";

export default {
    name: "messageCreate",
    once: false,
    async execute(client, message) {
        if (!message.content.toLowerCase().startsWith(".invoke")) return;

        const prompt = message.content.split(" ").slice(1).join(" ");

        if (!prompt) return message.reply("You need to provide a prompt. (e.g. `.invoke {prompt...}`)");

        await message.channel.sendTyping();
        await invokechain.execute(client, prompt, message);
    }
}
