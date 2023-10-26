import { FC } from "react";
import { WithId } from "../../types/common/utils";
import { Project } from "../../types/common/zod";
import { getElapsedTime } from "../../utils/date";
import style from "../../styles/project.module.css";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../../utils/client/dnd";

const GraveyardItem: FC<WithId<Project>> = (project) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.deadProject,
    item: project,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const { name, lastWorkedOnAt } = project;
  return (
    <div
      className={`${style.item} ${isDragging ? style.draggingItem : undefined}`}
      ref={drag}
    >
      <h4>{name}</h4>
      {lastWorkedOnAt && (
        <p>Dead since {getElapsedTime(lastWorkedOnAt, new Date())} days.</p>
      )}
    </div>
  );
};

export default GraveyardItem;
