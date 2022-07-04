import { RequestHandler } from "express";
import { Meeting } from "../models";

const createMeeting: RequestHandler = async (req, res) => {
  const meetingDetails = req.body;
  const meetingHost = req.headers.id as string;
  const result = await Meeting.create({
    host: meetingHost,
    ...meetingDetails,
  });

  res.status(200).json(result);
};

const getAllMeetings: RequestHandler = async (req, res) => {
  const hostID = req.headers.id as string;
  const allMeetings = await Meeting.scan().exec();
  const hostMeetings = allMeetings.filter((meeting) => meeting.host === hostID);
  res.status(200).json(hostMeetings);
};

const joinMeeting: RequestHandler = async (req, res) => {
  const hostID = req.headers.id as string;
  const meetingID = req.params.id;
  const meetingDetails = await Meeting.get(meetingID);
  const theHost: string = meetingDetails.toJSON().host;
  const inviteeArray = meetingDetails.toJSON().invitees;
  const invitee = inviteeArray.filter((inv: string) => inv === hostID);

  hostID === theHost || invitee.length
    ? res.status(200).json(meetingDetails)
    : res.status(403).json({ error: "NOT_AUTHORIZED" });
};

const updateMeeting: RequestHandler = async (req, res) => {
  const meetingID = req.params.id;
  const meetingDetails = req.body;
  await Meeting.update(meetingID, meetingDetails);
  const updatedMeetingDetails = await Meeting.get(meetingID);
  res.status(200).json(updatedMeetingDetails);
};

const deleteMeeting: RequestHandler = async (req, res) => {
  const meetingID = req.params.id;
  await Meeting.delete(meetingID);
  res.status(200).json({ deleted: `${meetingID}` });
};

const meetings = {
  createMeeting,
  getAllMeetings,
  joinMeeting,
  updateMeeting,
  deleteMeeting,
};

export default meetings;
