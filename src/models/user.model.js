import { prisma } from "../config/prisma.js";

export const getUserModel = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      image: true,
    },
  });
  return users;
};

export const getUserIdModel = async (id) => {
  const findedUser = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  return findedUser;
};

export const findEmailUser = async (email) => {
  const existedUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return existedUser;
};

export const createUserModel = async ({
  name,
  email,
  password,
  role,
  image,
}) => {
  const newUsers = await prisma.user.create({
    data: {
      name,
      email,
      image,
      password,
      role,
    },
  });
  return newUsers;
};

export const putUserModel = async ({
  id,
  name,
  email,
  password,
  role,
  image,
}) => {
  const updateUser = await prisma.user.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name,
      email,
      image,
      password,
      role,
    },
  });
  return updateUser;
};

export const deleteUserModel = async ({ id }) => {
  const deleteUser = await prisma.user.delete({
    where: {
      id: parseInt(id),
    },
  });
  return deleteUser;
};

export const refreshTokenUser = async ({id, refreshToken}) => {
  const updateUserToken = await prisma.user.update({
    where: {
      id,
    },
    data: {
      refresh_token: refreshToken,
    },
  });
   return updateUserToken;
};
