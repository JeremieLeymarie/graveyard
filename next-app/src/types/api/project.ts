import { WithId } from "../common/utils";
import { Project } from "../common/zod";

export type GetAllProjectsResponseData = {
  deadProjects: WithId<Project>[];
  activeProjects: WithId<Project>[];
};
