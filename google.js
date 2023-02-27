const axios = require('axios');

const apiUrl = 'https://www.googleapis.com/customsearch/v1';
const apiKey = process.env.GOOGLE_CUSTOM_SEARCH_API_KEY;
const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;
const numResults = 5;

async function getGoogleNews(query) {
    const response = await axios.get(apiUrl, {
        params: {
            key: apiKey,
            cx: searchEngineId,
            q: query,
            num: numResults
        }
    })
    const items = response.data.items;
    return items.map(item => {
        return {
            title: item.title,
            snippet: item.snippet,
            link: item.link
        }
    })
}

module.exports = { getGoogleNews }