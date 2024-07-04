import {
  createUserModel,
  deleteUserModel,
  findEmailUser,
  getUserIdModel,
  getUserModel,
  putUserModel,
} from "../models/user.model.js";
import { hashPassword } from "../utils/hashPasswords.js";

export const getUserController = async (req, res) => {
  const users = await getUserModel();
  if (!users) {
    res.status(404).json({
      message: "Users not found",
    });
    return;
  }

  res.send(users);
};

export const getUserIdController = async (req, res) => {
  const { id } = req.params;
  const findedUser = await getUserIdModel(id);
  if (!findedUser) {
    res.status(404).json({
      message: "User not found",
    });
    return;
  }
  res.send(findedUser);
};

export const createUserController = async (req, res) => {
  try {
    const { name, email, password, role, image } = req.body;
    const existedUser = await findEmailUser(email);
    const hashedPassword = await hashPassword(password);
    if (existedUser) {
      res.status(409).json({ message: "User already exists" });
      return;
    }

    const newUsers = await createUserModel({
      name,
      email,
      password: hashedPassword,
      role,
      image,
    });
    res.json({
      data: newUsers,
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const putUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, image } = req.body;
    if (!(name && email && role && image)) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const findedUser = await getUserIdModel(id);
    if (!findedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const updateUser = await putUserModel({
      id,
      name,
      email,
      role,
      image,
    });

    res.json({
      data: updateUser,
      message: "User updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const patchUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, image } = req.body;

    const findedUser = await getUserIdModel(id);
    if (!findedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const updateUser = await putUserModel({
      id,
      name,
      email,
      role,
      image,
    });

    res.json({
      data: updateUser,
      message: "User updated successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const findedUser = await getUserIdModel(id);
    if (!findedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    await deleteUserModel({ id });
    res.json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
