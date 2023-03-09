const axios = require('axios');

const { DISCORD_WEBHOOK_URL } = process.env;

function resultToMessageContent(result) {
    return `${result.question} ${result.answer ? "Yes." : "No."}`;
}

async function sendDiscordMessage(messageContent) {
    const message = {
        content: messageContent,
        username: 'IJCA Bot',
        avatar_url: 'https://imgur.com/bdfXw1T.png'
    };
    try {
        await axios.post(DISCORD_WEBHOOK_URL, message);
    } catch (error) {
        console.error('Error sending message:', error.toString());
    }
}

module.exports = {
    sendDiscordMessage,
    resultToMessageContent
}