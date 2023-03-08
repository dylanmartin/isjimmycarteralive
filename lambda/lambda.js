const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const { searchAndDigest } = require('./search-and-digest.js');
const { S3_BUCKET } = require('./environment-variables.js');

exports.handler = async (event, context) => {
    const bucket = S3_BUCKET;
    const questionKey = 'question.json';
    const answerKey = 'answer.json';

    try {
        // Read the question from S3
        const questionParams = {
            Bucket: bucket,
            Key: questionKey
        };
        const questionObject = await s3.getObject(questionParams).promise();
        const { searchString, question } = JSON.parse(questionObject.Body.toString());
        // Perform the search and digest the results using gpt-3
        const result = await searchAndDigest(searchString, question);
        // Upload the result to S3
        const resultParams = {
            Bucket: bucket,
            Key: answerKey,
            Body: JSON.stringify(result),
            ContentType: 'application/json'
        };
        await s3.putObject(resultParams).promise();

        return {
            statusCode: 200,
            body: 'result uploaded to s3'
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: err.toString()
        };
    }
};
