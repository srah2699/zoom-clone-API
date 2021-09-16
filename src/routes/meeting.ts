import controllers from "../controllers";
import express from "express";
import { Router } from "express";


const meetings = express.Router();

meetings.get('/',controllers.meeting.ViewMeeting)
meetings.post('/',controllers.meeting.CreateMeeting)
meetings.put('/:id', controllers.meeting.UpdateMeeting)
meetings.delete('/id:', controllers.meeting.DeleteMeeting)

export default meetings;
