import { RequestHandler } from "express";
import { Meeting } from "../models";
import { hostname } from "os";
import { v4 as uuidv4} from "uuid";

export const CreateMeeting: RequestHandler = async (req, res) => {
    
    
}

export const UpdateMeeting: RequestHandler = async (req, res) => {
    //const meetingid = req.params.id;
    const request = req.body;
    const updating = await Meeting.update({ id : req.params.id},request);
    res.status(200).send("updating done");
};

export const DeleteMeeting: RequestHandler = async (req, res) => {
    
    const meet = await Meeting.get(req.params.id);
    if(meet)
    {
        await Meeting.delete({id : req.params.id});
        res.status(200).json("deleted");
    }
    else{
        res.status(404).json("meetingId doesn't exist");
    }

};

const meetings = {UpdateMeeting, DeleteMeeting, CreateMeeting} ;
export default meetings 