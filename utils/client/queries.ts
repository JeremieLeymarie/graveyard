import { WithId } from "../../types/common/utils";
import { Project } from "../../types/common/zod";

export const updateProjectQuery = async (project: WithId<Project>) => {
  const id = project._id;
  const input: Project & { _id?: string } = { ...project };
  delete input._id;
  const res = await fetch(`api/project/${id}`, {
    method: "PUT",
    body: JSON.stringify(project),
  });
  return res.status;
};
