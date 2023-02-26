const axios = require('axios');
const API_KEY = process.env.NEWS_API_KEY;

async function getNews(SEARCH_TERM) {
        const response = await axios.get('https://newsapi.org/v2/everything', {
            params: {
                q: SEARCH_TERM,
                apiKey: API_KEY,
                pageSize: 10
            }
        })
        return response.data.articles;
}

module.exports = {
    getNews
}