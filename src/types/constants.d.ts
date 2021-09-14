type Constants = {
    production: any,
    development: any,
    testing: any,
    [index: string]: any
};

type DatabaseConstants = {
    AWS_ACCESS_KEY_ID: string,
    AWS_SECRET_ACCESS_KEY: string,
    AWS_REGION: string,
    PORT: number
};

type ConstantsBundle = {
    database: DatabaseConstants
};