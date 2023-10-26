import { NextApiRequest, NextApiResponse } from "next";
import { getMongoDatabase } from "../../../server/db";
import { ObjectId } from "mongodb";
import { Project, userSchema } from "../../../types/common/zod";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = typeof req.query.id === "string" ? req.query.id : undefined;
  if (!id) return;
  if (req.method === "PUT") {
    const result = await updateProject(req.body, id);
    const status = result ? 200 : 404;
    res.status(status).json({});
  }
  if (req.method === "GET") {
    const data = await getProjectById(id);
    res.status(200).json({ data });
  }
}

const updateProject = async (body: NextApiRequest["body"], id: string) => {
  try {
    const input = userSchema.parse(JSON.parse(body));
    const mongoId = new ObjectId(id);
    const db = await getMongoDatabase();
    const result = await db
      .collection<Project>("projects")
      .updateOne({ _id: mongoId }, { $set: input });
    return result;
  } catch (err) {
    console.log(err);
  }
};

const getProjectById = async (id: string) => {
  const mongoId = new ObjectId(id);
  const db = await getMongoDatabase();
  const project = await db
    .collection<Project>("projects")
    .findOne({ _id: mongoId });
  return project;
};
