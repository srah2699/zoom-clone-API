import express, { Application } from "express";

import configs from "./configs";
import routes from "./routes";


const PORT: number = parseInt(process.env.PORT || "5000");
const app: Application = express();


async function main () {

    await configs.database.connectToDatabase();

    //app.use("/users", routes.users);
    //app.use("/meetings", routes.meetings);
    app.use(routes.notFound);

    app.listen(PORT, function (): void {
        console.log(`Server running on localhost: ${PORT}`);
    }).on("error", function (error: any) {
        console.log(`Error running server: ${error}`)
    });
}

main();