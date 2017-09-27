import uuid from 'uuid';
import * as dynamoDbLib from '../libs/dynamodb-lib.js';
import { success, failure } from '../libs/response-libs.js';


// const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function main(event, context, callback) {
    const data = JSON.parse(event.body);

    const params = {
        TableName: 'expenses',
        Item: {
            category: data.category,
            expenseId: uuid.v4(),
            userId: event.requestContext.identity.cognitoIdentityId,
            amount: data.amount,
            createdAt: new Date().getTime()
        }
    };
    //save to db
    try {
        const result = await dynamoDbLib.call('put', params);
        callback(null, success(params.Item));
    }
    catch(e) {
        console.log(e);
        callback(null, failure({status: false}));
    }
};