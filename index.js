const {getNews} = require('./news-api.js');
const {getAnswer, generatePrompt} = require('./gpt.js');

(async (searchString, question) => {
    try {
        const newsArticles = await getNews(searchString);
        const prompt = generatePrompt(question, newsArticles);
        const answer = await getAnswer(prompt);
        console.log(`based on the ${newsArticles.length} news articles:`)
        console.log(answer);
    } catch (err) {
        console.log(err)
    }
})("jimmy carter", "is jimmy carter alive?")