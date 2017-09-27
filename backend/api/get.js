import * as dynamoDbLib from "../libs/dynamodb-lib.js";
import {success, failure} from "../libs/response-libs.js";

export async function getCategoryExpenses (event, context, callback) {
    const params = {
        TableName: "expenses",
        KeyConditions: [
            
            // category: event.pathParameters.category
        ]
    }

    try {
        const result = await dynamoDbLib.call("query", params);
        console.log("results: ", result);

        if (result.Item) {
            callback(null, success(result.Item));
        } else {
            callback(null, failure({status: false, error: "No expenses"}));
        }
    } catch (e) {
        console.log(e);
        callback(null, failure({status: false}));
    }
}