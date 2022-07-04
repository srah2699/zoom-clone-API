import { User, Meeting } from "../models";
import { RequestHandler } from "express";

const authorizedUser: RequestHandler = async (req, res, next) => {
  const meetingHost = req.headers.id as string;
  console.log(meetingHost)
  const hostPresent = await User.get(meetingHost);
  hostPresent ? next() : res.status(403).json({ error: "UNAUTHORIZED" });
};

const isHost: RequestHandler = async (req, res, next) => {
  const meetingHost = req.headers.id as string;
  const meetingID = req.params.id;
  const meetingDetail = await Meeting.get(meetingID);
  const host = meetingDetail.toJSON().host;
  host === meetingHost
    ? next()
    : res.status(403).send({ error: "NOT_MEETING_HOST" });
};

const accountOwner: RequestHandler = async (req, res, next) => {
  const authorizedUser = req.headers.id;
  
  const user = await User.get(req.params.id);
  authorizedUser === user.id
    ? next()
    : res.status(405).json({ error: "NOT_ACCOUNT_OWNER" });
};

const auth = { authorizedUser, isHost, accountOwner };
export default auth;
