import dynamoose from "dynamoose";

import constants from "../constants";


async function connectToDatabase () {
    
    dynamoose.aws.sdk.config.update({
        accessKeyId: constants.database.AWS_ACCESS_KEY_ID,
        secretAccessKey: constants.database.AWS_SECRET_ACCESS_KEY,
        region: constants.database.AWS_REGION
    });

    dynamoose.aws.ddb.local();

}

const database = {
    connectToDatabase
};

export default database;