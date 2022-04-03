import express from "express";
import userModel from "../models/userModel.js";
const router = express.Router();

router.get("/getUser", async (req, res) => {
  try {
    const userList = await userModel.find();
    res.status(200).send(userList);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/addUser", async (req, res) => {
  const userList = await userModel.findOne().sort({
    _id: -1,
  });
  const id = !userList ? 1 : parseInt(userList.id) + 1;

  const user = new userModel({
    id: id,
    name: req.body.name,
    sex: req.body.sex,
    DOB: req.body.DOB,
    address: req.body.address,
    email: req.body.email,
    role: req.body.role,
  });
  try {
    const savedUser = await user.save();
    res.status(200).send(savedUser);
  } catch (err) {
    res.status(400).send("error");
  }
});

router.get("/getUser/:name", async (req, res) => {
  try {
    const userList = await userModel.find({
      name: { $regex: ".*" + req.params.name + ".*" },
    });
    res.status(200).send(userList);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/getUserById/:id", async (req, res) => {
  try {
    const userList = await userModel.find({
      id: req.params.id,
    });
    res.status(200).send(userList);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.patch("/updateUser/:id", async (req, res) => {
  try {
    const userUpdate = {
      name: req.body.name,
      sex: req.body.sex,
      DOB: req.body.DOB,
      address: req.body.address,
      email: req.body.email,
      role: req.body.role,
    };
    const updatedUser = await userModel.findOneAndUpdate(
      { id: req.params.id },
      userUpdate,
      {
        new: true,
      }
    );
    res.status(200).send("Update Success.");
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/deleteUser/:id", async (req, res) => {
  try {
    let deleteUser = await userModel.findOneAndDelete({ id: req.params.id });
    res.status(200).send("Delete success.");
  } catch (err) {
    res.status(400).send(err);
  }
});
export default router;
