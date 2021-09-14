import dynamoose from "dynamoose";
import { v4 as uuidv4 } from "uuid";

const schema = new dynamoose.Schema({
    id: {
        type: String,
        default: uuidv4
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    }
});

const User = dynamoose.model('users', schema);

export default User;