// JavaScript (discord.js)

// Load environment variables from the .env file
require('dotenv').config();

// Import the necessary discord.js classes
const { Client, GatewayIntentBits } = require('discord.js');

// Create a new client instance with required intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent // This intent is required to read message content!
    ]
});

// Get your secrets from the environment variables
const BOT_TOKEN = process.env.BOT_TOKEN;
const TARGET_USER_ID = process.env.TARGET_USER_ID;

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log(`✅ Ready! Logged in as ${client.user.tag}`);
});

// Listen for new messages
client.on('messageCreate', async (message) => {
    // 1. Ignore messages from other bots
    if (message.author.bot) return;

    // 2. Check if the message is from our target user
    if (message.author.id === TARGET_USER_ID) {
        const originalContent = message.content;

        // 3. Reverse the message content
        const reversedContent = originalContent.split('').reverse().join('');

        // 4. If there's content to send, send it back to the same channel
        if (reversedContent) {
            try {
                await message.channel.send(reversedContent);
            } catch (error) {
                console.error('Failed to send message:', error);
            }
        }
    }
});

// Log in to Discord with your client's token
client.login(BOT_TOKEN);
