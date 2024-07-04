import { prisma } from "../config/prisma.js";
import { findEmailUser, getUserIdModel, putUserModel, refreshTokenUser } from "../models/user.model.js";
import { comparePassword, hashPassword } from "../utils/hashPasswords.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";

export const registerUserController = async (req, res) => {
  try {
    const { name, email, image, password, confirmPassword, role } = req.body;
    if (password !== confirmPassword) {
      res.status(400).json({
        message: "Passwords does not match",
      });
      return;
    }
    const hashedPassword = await hashPassword(password);
    const existedUser = await findEmailUser(email);
    if (existedUser) {
      res.status(409).json({
        message: "User already exists",
      });
      return;
    }
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        image,
        password: hashedPassword,
        role,
      },
    });

    res.json({
      data: newUser,
      message: "Registered successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const loginUserController = async (req, res) => {
  try {
    const { userEmail, password } = req.body;
    const foundUser = await prisma.user.findMany({
      where: {
        email: userEmail,
      },
    });

    if (foundUser.length === 0) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    
    const match = await comparePassword(password, foundUser[0].password);
    if (!match) {
      res.status(401).json({ message: "Wrong password" });
      return;
    }

    const { id, name, email } = foundUser[0];
    const accessToken = generateAccessToken({ id, name, email });
    const refreshToken = generateRefreshToken({ id, name, email });
    await refreshTokenUser({id, refreshToken});

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      accessToken,
      message: "Login successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutUserController = async (req, res) => {
  try {
      const refreshToken = req.cookies.refreshToken;
      if(!refreshToken) {
          res.sendStatus(401);
          return;
      };

      const user = await prisma.user.findMany({
          where: {
              refresh_token: refreshToken
          }
      });

      if(!user[0]) {
          res.sendStatus(204);
          return;
      };

      const id = user[0].id;

    await refreshTokenUser({id, refreshToken: null});
      res.clearCookie('refreshToken');
      return res.status(200).json({
          message: "Logout successfully",
      });
  } catch (error) {
      console.log(error);
  }
}

// export const userProfileDetail =async (req, res) => {
// try {
//   const {id} = req.params;
//   const findedUser = await getUserIdModel(id);
//   res.json({
//     data: findedUser
//   })
// } catch (error) {
//   console.log(error);
// }
// }

// export const editUserProfileController = async (req, res) => {
//   try {
//     const {id} = req.params;
//     const {name, email, image, password} = req.body;
//     const updateUser = await putUserModel({
//       name,
//       email,
//       image,
//       password,
//     });
//     res.json({

//     })
//   } catch (error) {
//     console.log(error);
//   }
// }