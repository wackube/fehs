// JavaScript (discord.js) - DIAGNOSTIC VERSION

// Import built-in Node.js modules for diagnostics
const fs = require('fs');
const path = require('path');

// --- Start of Diagnostic Code ---
console.log(`--- STARTING DIAGNOSTICS ---`);
console.log(`Node.js Version: ${process.version}`);
console.log(`Current Working Directory: ${process.cwd()}`);

const dirPath = process.cwd();
try {
    const files = fs.readdirSync(dirPath);
    console.log(`\nFiles and folders in Current Directory:`);
    console.log(`-> ${files.join('\n-> ')}`);

    const nodeModulesPath = path.join(dirPath, 'node_modules');
    if (fs.existsSync(nodeModulesPath)) {
        console.log(`\n✅ 'node_modules' folder was found.`);
        
        const dotenvPath = path.join(nodeModulesPath, 'dotenv');
        if (fs.existsSync(dotenvPath)) {
            console.log(`✅ 'dotenv' package folder was found inside node_modules.`);
        } else {
            console.error(`❌ CRITICAL: 'dotenv' package folder was NOT FOUND inside node_modules.`);
        }

    } else {
        console.error(`❌ CRITICAL: 'node_modules' folder was NOT FOUND in the current directory.`);
    }

} catch (e) {
    console.error(`\nError during directory scan:`, e);
}
console.log(`--- ENDING DIAGNOSTICS ---\n`);
// --- End of Diagnostic Code ---


// Now, attempt to run the original code
console.log(`Attempting to require 'dotenv'...`);
try {
    require('dotenv').config();
    console.log("Successfully required 'dotenv'.");

    const { Client, GatewayIntentBits } = require('discord.js');
    console.log("Successfully required 'discord.js'.");

    // Create a new client instance with required intents
    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent
        ]
    });

    const BOT_TOKEN = process.env.BOT_TOKEN;
    const TARGET_USER_ID = process.env.TARGET_USER_ID;

    client.once('ready', () => {
        console.log(`✅ Bot is ready! Logged in as ${client.user.tag}`);
    });

    client.login(BOT_TOKEN);

} catch(err) {
    console.error("\n---! ENCOUNTERED ERROR !---");
    console.error(err);
    console.error("--------------------------");
}
