import dynamoose from "dynamoose";
import { v4 as uuidv4 } from "uuid";

import User from "./User";

const schema = new dynamoose.Schema({
    id: {
        type: String,
        default: uuidv4
    },
    host: {
        type: User,
        required: true,
    },
    time: {
        type: Date,
        default: Date.now,
        required: true
    },
    invitees: {
        type: Array,
        schema: [ User ],
        default: []
    }
});

const Meeting = dynamoose.model('meetings', schema);

export default Meeting;