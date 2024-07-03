import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma.js";
import { generateAccessToken } from "../utils/generateToken.js";

export const refreshTokenController = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      res.sendStatus(401);
      return;
    }

    const getUserPayload = await prisma.user.findFirst({
      where: {
        refresh_token: refreshToken,
      },
    });

    if (!getUserPayload) {
      res.sendStatus(403);
      return;
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          console.log("Error verifying token:", err);
          res.sendStatus(403);
          return;
        }
        const accessToken = generateAccessToken({
          id: getUserPayload.id,
          email: getUserPayload.email,
          name: getUserPayload.name,
        });
        res.json({
          accessToken,
          message: "Token refreshed successfully",
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
