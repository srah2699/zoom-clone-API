import express, { Application } from "express";

import configs from "./configs";
import routes from "./routes";

const PORT = process.env.PORT || 5000;
const app: Application = express();

async function main () {

    await configs.database();

    app.use("/users", routes.users);
    app.use("/meetings", routes.meetings);
    app.use(routes.notFound);

    app.listen(
        PORT,
        function () {
            console.log(`Server running on localhost:${PORT}`);
        }
    );

}

main();