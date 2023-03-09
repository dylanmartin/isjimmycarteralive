const { getAnswer, generatePrompt } = require('./gpt.js');
const { getGoogleNews } = require('./google.js');

async function searchAndDigest(searchString, question){
        const newsArticles = await getGoogleNews(searchString);
        const prompt = generatePrompt(searchString, question, newsArticles);
        const answer = await getAnswer(prompt);
        return {
            question,
            answer: answer.answer,
            confidence: answer.confidence,
            numberOfArticles: newsArticles.length,
            time: Date.now()
        }
}

module.exports = { searchAndDigest }
