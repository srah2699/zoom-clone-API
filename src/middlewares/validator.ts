import { RequestHandler } from "express";
import { Meeting, User } from "../models";

const checkHeader: RequestHandler = async (req, res, next) => {
  const meetingHost = req.headers.id as string;
  meetingHost ? next() : res.status(401).json({ error: "TOKEN_MISSING" });
};

const checkMeeting: RequestHandler = async (req, res, next) => {
  const meetingID = req.params.id;
  const meetingDetail = await Meeting.get(meetingID);
  meetingDetail ? next() : res.status(404).json({ error: "MEETING_NOT_FOUND" });
};

const checkParticipants: RequestHandler = async (req, res, next) => {
  const participantList = req.body.invitees;
  const allUsers = await User.scan().exec();
  const registeredList = allUsers.map((user) => user.id);
  participantList.every((id: string) => registeredList.includes(id))
    ? next()
    : res.status(406).json({ error: "PARTICIPANT_LIST_INVALID" });
};

const validator = { checkHeader, checkMeeting, checkParticipants };
export default validator;
