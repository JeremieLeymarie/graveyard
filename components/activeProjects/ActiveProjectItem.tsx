import { FC } from "react";
import { WithId } from "../../types/common/utils";
import { Project } from "../../types/common/zod";
import { getElapsedTime } from "../../utils/date";
import style from "../../styles/project.module.css";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../../utils/client/dnd";

const ActiveProjectItem: FC<WithId<Project>> = (project) => {
  const { name, lastWorkedOnAt, createdAt } = project;
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.activeProject,
    item: project,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      className={`${style.item} ${isDragging ? style.draggingItem : undefined}`}
      ref={drag}
    >
      <h4>{name}</h4>
      {createdAt && (
        <p>Started {getElapsedTime(createdAt, new Date())} days ago .</p>
      )}
    </div>
  );
};
export default ActiveProjectItem;
