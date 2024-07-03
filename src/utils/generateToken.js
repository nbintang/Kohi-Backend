import jwt from "jsonwebtoken";

export function generateAccessToken({
    id,
    email,
    name,
}) {
  const accessToken = jwt.sign(
    {
      id,
      email,
      name,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "10m",
    }
  );
  return accessToken;
}

export  function generateRefreshToken({
    id,
    email,
    name,
}) {
  const refreshToken = jwt.sign(
    {
      id,
      email,
      name,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
  return refreshToken;
}
