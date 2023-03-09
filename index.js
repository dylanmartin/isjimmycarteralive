const { resultToMessageContent, sendDiscordMessage } = require("./lambda/discord");
const { searchAndDigest } = require("./lambda/search-and-digest");

(async ()=>{
    const result = await searchAndDigest("Is Jimmy Carter Alive?", "Is Jimmy Carter alive?")
    const messageContent = resultToMessageContent(result)
    await sendDiscordMessage(messageContent)

})()