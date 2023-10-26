import { FC, MouseEvent } from "react";
import style from "../styles/common.module.css";
import graveyardStyle from "../styles/project.module.css";
import AddIcon from "./ui/icons/AddIcon";

type Props = {
  onAddProjectClick: (_event: MouseEvent) => void;
};

const GraveyardHeader: FC<Props> = ({ onAddProjectClick }) => (
  <div>
    <div className={graveyardStyle.header}>
      <h2>Graveyard</h2>
      <button onClick={onAddProjectClick} className={style.svgButton}>
        <AddIcon />
      </button>
    </div>
    <hr />
  </div>
);

export default GraveyardHeader;
