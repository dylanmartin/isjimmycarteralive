const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function getAnswer(prompt){
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0,
        max_tokens: 50,
      });
      const sanitizedJSON = sanitizeJSON(response.data.choices[0].text);
      return JSON.parse(sanitizedJSON);
}

function sanitizeJSON(text){
    const startIndex = text.indexOf('{');
    const endIndex = text.lastIndexOf('}');
    const result = text.substring(startIndex, endIndex+1);
    return result;
}

// @param queryString: String - the query string that was used to generate the news articles. This string must be a yes or no question.
function generatePrompt(searchString,question,  newsArticles) {
    let prompt = `The following results are from newsapi.com when searching for "${searchString}", assuming the latest developments are captured in these headlines, please respond to the question "${question}" with a json object of the following format {"answer": <Boolean>, "confidence": <Number>}. "answer" should be your best guess based on the newsApi results, and "confidence" should be a number between 0 and 1 representing your confidence in your answer. \n\n`;
    prompt += JSON.stringify(newsArticles, null, 2);
    return prompt
}


module.exports = {
    getAnswer,
    generatePrompt
}