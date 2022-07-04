import { RequestHandler } from "express";
import { Meeting, User } from "../models";

export const AddUser: RequestHandler = async (req, res) => {
  if (!req.body.email || !req.body.name)
    return res.status(400).json({ error: "Incomplete Data" });

  const isEmailPresent = await User.scan("email").eq(req.body.email).exec();
  if (isEmailPresent && isEmailPresent.length)
    return res.status(400).json({ error: "Email already exists" });

  const user = new User({
    name: req.body.name,
    email: req.body.email,
  });

  const inserted = await user.save();
  res.send(inserted);
};

export const GetUsers: RequestHandler = async (req, res) => {
  let users: any = await User.scan().exec();
  console.log(users);
  users = Array.isArray(users)
    ? users.map((user) => {
        return user.toJSON();
      })
    : [];
  res.send(users);
};

export const GetUser: RequestHandler = async (req, res) => {
  const user = await User.get(req.params.id);
  if (!user) return res.status(404).json({ error: "USER NOT FOUND" });

  const meets = await Meeting.scan("host").eq(req.params.id).exec();
  const meetings = Array.isArray(meets)
    ? meets.map((meet) => meet.toJSON())
    : [];

  const details = {
    id: user.id,
    name: user.name,
    email: user.email,
    meetings,
  };

  res.send(details);
};

export const UpdateUser: RequestHandler = async (req, res) => {
  const user = await User.get(req.params.id);
  if (!user) return res.status(404).json({ error: "USER NOT FOUND" });

  if (!req.body.email || !req.body.name)
    return res.status(400).json({ error: "Incomplete Data" });

  const isEmailPresent = await User.scan("email").eq(req.body.email).exec();
  if (isEmailPresent)
    return res.status(400).json({ error: "Email already exists" });

  const updated = await User.update(
    { id: req.params.id },
    {
      name: req.body.name,
      email: req.body.email,
    }
  );
  res.send(updated);
};

export const DeleteUser: RequestHandler = async (req, res) => {
  const user = await User.get(req.params.id);
  if (!user) return res.status(404).json({ error: "USER NOT FOUND" });
  await User.delete(req.params.id);
  console.log("deleted");
  res.send("deleted");
};
