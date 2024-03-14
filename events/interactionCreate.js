export default {
    name: "interactionCreate",
    once: false,
    async execute(client, interaction) {
        if (interaction.isMessageComponent()) {
            if (interaction.customId === "role_menu") {
                await interaction.reply({content: "Updating your roles...", ephemeral: true});
                const member = interaction.member;

                for (const roleId of interaction.values) {
                    const role = interaction.guild.roles.cache.get(roleId);
                    if (role) {
                        if (member.roles.cache.has(role.id)) {
                            await member.roles.remove(role);
                            await interaction.followUp({content: `\- Removed the role ${role.name}!`, ephemeral: true});
                        } else {
                            await member.roles.add(role);
                            await interaction.followUp({content: `+ Added the role ${role.name}!`, ephemeral: true});
                        }
                    } else {
                        await interaction.reply({content: "Role not found!", ephemeral: true});
                    }
                }
            }
            return;
        }

        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(client, interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({content: "There was an error while executing this command!", ephemeral: true});
        }
    }
}
