const { getAnswer, generatePrompt } = require('./gpt.js');
const { getGoogleNews } = require('./google.js');

(async (searchString, question) => {
    try {
        const newsArticles = await getGoogleNews(searchString);
        const prompt = generatePrompt(searchString, question, newsArticles);
        const answer = await getAnswer(prompt);
        console.log(`based on ${newsArticles.length} news articles, the answer to "${question}" is ${answer.answer} with a confidence of ${answer.confidence}`)
    } catch (err) {
        console.log(err)
    }
})("jimmy carter", "is jimmy carter alive?")