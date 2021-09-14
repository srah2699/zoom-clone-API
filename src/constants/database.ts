const production: DatabaseConstants = {
    AWS_ACCESS_KEY_ID: 'fake',
    AWS_SECRET_ACCESS_KEY: 'false',
    AWS_REGION: 'us-east-1',
    PORT: 8000
};

const development: DatabaseConstants = {
    AWS_ACCESS_KEY_ID: 'fake',
    AWS_SECRET_ACCESS_KEY: 'false',
    AWS_REGION: 'us-east-1',
    PORT: 8000
};

const testing: DatabaseConstants = {
    AWS_ACCESS_KEY_ID: 'fake',
    AWS_SECRET_ACCESS_KEY: 'false',
    AWS_REGION: 'us-east-1',
    PORT: 8000
};

const database: Constants = {
    production,
    development,
    testing
};

const env: string = process.env.ENV || "development";

export default database[env];