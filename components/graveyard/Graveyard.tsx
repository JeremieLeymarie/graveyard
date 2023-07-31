import { FC } from "react";
import { WithId } from "../../types/common/utils";
import { Project } from "../../types/common/zod";
import GraveyardItem from "./GraveyardItem";
import style from "../../styles/project.module.css";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../utils/client/dnd";
import { updateProjectQuery } from "../../utils/client/queries";

type Props = {
  projects: WithId<Project>[];
  onDropProject: (project: WithId<Project>) => void;
};

const Graveyard: FC<Props> = ({ projects, onDropProject }) => {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.activeProject,
      drop: async (item: WithId<Project>, _monitor) => {
        console.log(item);
        const project: WithId<Project> = {
          ...item,
          status: "dead",
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
      <h3>Dead projects</h3>
      {projects.map((project) => (
        <GraveyardItem key={project._id} {...project} />
      ))}
    </div>
  );
};

export default Graveyard;
