const {searchAndDigest} = require('./lambda/search-and-digest.js');

(async (searchString, question) => {
    const result = await searchAndDigest(searchString, question);
    console.log(result);
})("jimmy carter", "is jimmy carter alive?")