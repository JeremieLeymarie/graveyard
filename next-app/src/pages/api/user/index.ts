import { NextApiRequest, NextApiResponse } from "next";
import { getMongoDatabase } from "../../../server/db";
import { createUserSchema, User } from "../../../types/common/zod";
import * as bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const result = await createUser(req.body);
    const status = result ? 200 : 404;
    res.status(status).json({});
  } else {
    res.status(405).end();
  }
}

const createUser = async (body: NextApiRequest["body"]) => {
  try {
    const input = createUserSchema.parse(JSON.parse(body));
    if (!input) return;
    if (input.password !== input.confirmPassword) return;

    const db = await getMongoDatabase();

    const isUsernameOrEmailTaken = await db
      .collection<User>("users")
      .findOne({ $or: [{ username: input.username }, { email: input.email }] });
    if (isUsernameOrEmailTaken) return;

    const saltRounds = 10;
    const myPlaintextPassword = "s0//P4$$w0rD";
    const someOtherPlaintextPassword = "not_bacon";
    const hashedPass = bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
    const date = new Date().toDateString();
    const inputWithDates: User = { ...input, createdAt: date, updatedAt: date };
    const result = await db.collection<User>("users").insertOne(inputWithDates);
    return result;
  } catch (err) {
    console.error(err);
  }
};
