import {ActionRowBuilder, Colors, EmbedBuilder, REST, RoleSelectMenuBuilder, Routes} from "discord.js";

export default {
    name: "ready",
    once: true,
    async execute(client) {
        console.log("Ready!");
        const k_dev_guild_id = "1211474201752375347";

        // Register slash commands
        const commands = Array.from(client.commands.values()).map(command => command.data.toJSON());

        const rest = new REST({version: "10"}).setToken(process.env.DISCORD_BOT_TOKEN);

        try {
            console.log("Started refreshing application (/) commands.");

            await rest.put(Routes.applicationGuildCommands(client.user.id, k_dev_guild_id), {body: commands});

            console.log("Successfully reloaded application (/) commands.");
        } catch (error) {
            console.error(error);
        }

        // Set presence
        client.user.setPresence({activities: [{name: "HackQC 2024", type: 5}], status: "online"});
        console.log("Updated presence!");

        // Self-assign roles menu
        console.log("Finding the self-assign roles menu...");
        const guild = await client.guilds.resolve(k_dev_guild_id);
        const selfRoleChannel = guild.channels.resolve("1216220741138387019");
        const selfRoleMessage = await selfRoleChannel.messages.resolve("1216237942536802354");

        const role_embed = new EmbedBuilder()
        .setColor(Colors.Blurple)
        .setTitle("Self assign roles")
        .setDescription("Use the buttons to assign yourself a role!" +
            "\n\n- <@&1216232940204458014>: yes ice cream yay" +
            "\n- <@&1216233074564792441>: no ice cream boo")
        .setFooter({text: `Last updated: ${new Date().toLocaleString()}`});

        const role_menu = new RoleSelectMenuBuilder()
        .setCustomId("role_menu")
        .setPlaceholder("Nothing selected")
        .setMinValues(0)
        .setMaxValues(2);

        const action_row = new ActionRowBuilder().setComponents(role_menu);

        let reply;

        if (!selfRoleMessage) {
            console.log("Message not found, sending the message...");
            reply = selfRoleChannel.send({embeds: [role_embed], components: [action_row]});
        } else {
            console.log("Message found, Updating the message...");
            reply = selfRoleMessage.edit({embeds: [role_embed], components: [action_row]});
        }
    }
};
