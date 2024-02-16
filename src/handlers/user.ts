import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res, next) => {
  try {
    // const findUser = await prisma.user.findUnique({
    //   where: {
    //     username: req.body.username,
    //   },
    // });
    // if (findUser) {
    //   res.status(400).json({ message: "username already exist" });
    //   return;
    // }

    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
      },
    });

    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    err.type = "input";
    next(err);
  }
};

export const signin = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  if (!user) {
    res.status(401).json({ message: "invalid credentials" });
    return;
  }

  const isValid = await comparePasswords(req.body.password, user.password);

  if (!isValid) {
    res.status(401).json({ message: "invalid credentials" });
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};
