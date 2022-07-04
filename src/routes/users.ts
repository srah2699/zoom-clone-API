import {
  AddUser,
  DeleteUser,
  GetUser,
  GetUsers,
  UpdateUser,
} from "../controllers/users";
import express from "express";

import middlewares from "../middlewares";
const router = express.Router();

router.get(
  "/",
  [middlewares.validator.checkHeader, middlewares.auth.authorizedUser],
  GetUsers
);
router.get(
  "/:id",
  [middlewares.validator.checkHeader, middlewares.auth.authorizedUser],
  GetUser
);
router.put(
  "/:id",
  [
    middlewares.validator.checkHeader,
    middlewares.auth.authorizedUser,
    middlewares.auth.accountOwner,
  ],
  UpdateUser
);
router.post(
  "/",

  AddUser
);
router.delete(
  "/:id",
  [
    middlewares.validator.checkHeader,
    middlewares.auth.authorizedUser,
    middlewares.auth.accountOwner,
  ],
  DeleteUser
);

export default router;
