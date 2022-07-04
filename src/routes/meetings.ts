import { Router } from "express";

import controllers from "../controllers";
import middlewares from "../middlewares";

const meetings = Router();

meetings.post(
  "/",
  [
    middlewares.validator.checkHeader,
    middlewares.auth.authorizedUser,
    middlewares.validator.checkParticipants,
  ],
  controllers.meetings.createMeeting
);

meetings.get(
  "/",
  [middlewares.validator.checkHeader, middlewares.auth.authorizedUser],
  controllers.meetings.getAllMeetings
);

meetings.get(
  "/:id",
  [
    middlewares.validator.checkHeader,
    middlewares.auth.authorizedUser,
    middlewares.validator.checkMeeting,
  ],
  controllers.meetings.joinMeeting
);

meetings.put(
  "/:id",
  [
    middlewares.validator.checkHeader,
    middlewares.auth.authorizedUser,
    middlewares.validator.checkMeeting,
    middlewares.auth.isHost,
  ],
  controllers.meetings.updateMeeting
);
meetings.delete(
  "/:id",
  [
    middlewares.validator.checkHeader,
    middlewares.auth.authorizedUser,
    middlewares.validator.checkMeeting,
    middlewares.auth.isHost,
  ],
  controllers.meetings.deleteMeeting
);

export default meetings;
