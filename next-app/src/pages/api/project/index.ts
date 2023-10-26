import type { NextApiRequest, NextApiResponse } from "next";
import { getMongoDatabase } from "../../../server/db";
import { GetAllProjectsResponseData } from "../../../types/api/project";
import { Project, projectSchema } from "../../../types/common/zod/project";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const result = await addProject(req.body);
    const status = result ? 200 : 404;
    res.status(status).json({});
  }
  if (req.method === "GET") {
    const data = await getAllProjects();
    res.status(200).json({ data });
  }
}

const addProject = async (body: NextApiRequest["body"]) => {
  try {
    console.log(body, typeof body);
    const input = projectSchema.parse(JSON.parse(body));
    if (!input) return;
    const db = await getMongoDatabase();
    const result = await db.collection<Project>("projects").insertOne(input);
    return result;
  } catch (err) {
    console.log(err);
  }
};

const getAllProjects = async (): Promise<GetAllProjectsResponseData> => {
  const db = await getMongoDatabase();
  const projects = await db.collection<Project>("projects").find({}).toArray();
  const response: GetAllProjectsResponseData = {
    deadProjects: [],
    activeProjects: [],
  };
  projects.forEach((project) => {
    response[
      project.status === "active" ? "activeProjects" : "deadProjects"
    ]?.push({ ...project, _id: project._id.toString() });
  });
  return response;
};
