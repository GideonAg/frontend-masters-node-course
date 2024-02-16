import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const comparePasswords = async (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

export const hashPassword = async (plainPassword) => {
  return bcrypt.hash(plainPassword, 10);
};

export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );
  return token;
};

export const protectRoutes = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401).json({ message: "not authorized" });
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401).json({ message: "not a valid token" });
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
    return;
  } catch (e) {
    console.error(e);
    res.status(401).json({ message: "not authorized" });
    return;
  }
};
