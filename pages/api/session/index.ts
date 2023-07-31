import { NextApiRequest, NextApiResponse } from "next";
import { getMongoDatabase } from "../../../server/db";
import { loginSchema, User } from "../../../types/common/zod";
import * as jose from "jose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const jwt = await createSession(req.body);
    const status = jwt ? 200 : 404;
    if (jwt) res.setHeader("token", jwt);
    res.status(status).json({});
  } else {
    res.status(405).end();
  }
}

const createSession = async (body: NextApiRequest["body"]) => {
  try {
    const input = loginSchema.parse(JSON.parse(body));
    if (!input) return;
    const db = await getMongoDatabase();
    const user = await db.collection<User>("users").findOne({
      password: input.password,
      $or: [
        { username: input.usernameOrEmail },
        { email: input.usernameOrEmail },
      ],
    });
    if (user) {
      //   const privateKey = process.env.JWT_KEY;
      //   if (!privateKey) return;
      const jwt = await new jose.SignJWT({ id: user._id })
        .setProtectedHeader({ alg: "ES256" })
        .setIssuedAt()
        .setExpirationTime("1y");
      return jwt;
    }
    return;
  } catch (err) {
    console.error(err);
  }
};
