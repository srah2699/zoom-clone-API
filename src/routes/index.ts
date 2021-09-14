import { Request, Response, NextFunction } from "express";

import users from "./users";
import meetings from "./meetings";

function notFound (req: Request, res: Response, next: NextFunction) {
    res.status(404).send({ error: "NOT_FOUND" });
}

const routes = {
    users,
    meetings,
    notFound
};

export default routes;