const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

const GUILD_ID = '1132797182496481310';
const LOG_CHANNEL_ID = '1171430399193382954';
const VIP_ROLE_ID = '1213545710079975474';

client.on('guildMemberUpdate', async (oldMember, newMember) => {
    if (newMember.guild.id !== GUILD_ID) return;
    if (!newMember.roles.cache.has(VIP_ROLE_ID)) return;

    if (oldMember.user.username !== newMember.user.username) {
        const logChannel = newMember.guild.channels.cache.get(LOG_CHANNEL_ID);

        if (logChannel) {
            const embed = new EmbedBuilder()
                .setTitle('Username Changed')
                .setColor('Red')
                .setAuthor({
                    name: newMember.user.tag,
                    iconURL: newMember.user.displayAvatarURL()
                })
                .setDescription(
                    `**Old Username:** \`${oldMember.user.username}\`\n` +
                    `**New Username:** \`${newMember.user.username}\``
                )
                .setTimestamp();

            logChannel.send({ embeds: [embed] });
        }

        try {
            await newMember.send(
                '⚠️ You changed your username as a Vip-Member. Please open a ticket so staff can assist you.'
            );
        } catch {}
    }
});

client.once('ready', () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
});

client.login(process.env.BOT
             _TOKEN);
