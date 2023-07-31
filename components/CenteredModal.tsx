import { FC } from "react";
import style from "../styles/common.module.css";

type Props = {
  children?: JSX.Element;
};

const CenteredModal: FC<Props> = ({ children }) => (
  <div className={style.modal}>{children}</div>
);

export default CenteredModal;
