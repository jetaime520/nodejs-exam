import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models";
import { AppError } from "../utils/appError";

const SALT_ROUNDS = 10;

export async function register(email: string, password: string, name: string) {
  const exists = await User.findOne({ where: { email } });
  if (exists) throw new AppError(400, "EMAIL_EXISTS", "Email already registered");

  const hash = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await User.create({
    email,
    password: hash,
    name,
  });

  return user;
}

export async function login(email: string, password: string) {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new AppError(401, "INVALID_CREDENTIALS", "Invalid email or password");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new AppError(401, "INVALID_CREDENTIALS", "Invalid email or password");

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "2h" }
  );

  return { user, token };
}