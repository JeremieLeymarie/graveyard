import { FC } from "react";
import { WithId } from "../../types/common/utils";
import { Project } from "../../types/common/zod";
import style from "../../styles/project.module.css";
import ActiveProjectItem from "./ActiveProjectItem";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../utils/client/dnd";
import { updateProjectQuery } from "../../utils/client/queries";

type Props = {
  projects: WithId<Project>[];
  onDropProject: (project: WithId<Project>) => void;
};

const ActiveProjects: FC<Props> = ({ projects, onDropProject }) => {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.deadProject,
      drop: async (item: WithId<Project>, _monitor) => {
        console.log(item);
        const project: WithId<Project> = {
          ...item,
          status: "active",
          lastWorkedOnAt: new Date().toDateString(),
        };
        const status = await updateProjectQuery(project);
        onDropProject(project);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  return (
    <div
      className={`${style.projectContainer} ${isOver && style.isHovered}`}
      ref={drop}
    >
      <h3>Active projects 🎉</h3>
      {projects.map((project) => (
        <ActiveProjectItem key={project._id} {...project} />
      ))}
    </div>
  );
};

export default ActiveProjects;
