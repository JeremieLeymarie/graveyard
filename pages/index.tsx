import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import AddProject from "../components/AddProject";
import CenteredModal from "../components/CenteredModal";
import Graveyard from "../components/graveyard/Graveyard";
import Header from "../components/Header";
import styles from "../styles/project.module.css";
import commonStyles from "../styles/common.module.css";
import { GetAllProjectsResponseData } from "../types/api/project";
import Spinner from "../components/ui/Spinner";
import ActiveProjects from "../components/activeProjects/ActiveProjects";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { WithId } from "../types/common/utils";
import { Project } from "../types/common/zod";

const Home: NextPage = () => {
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [projects, setProjects] = useState<GetAllProjectsResponseData>();

  const keydownHandler = useCallback((e: KeyboardEvent) => {
    const cmdOrCtrl = e.ctrlKey || e.metaKey;
    if (e.key === "Escape") setIsAddProjectModalOpen(false);
    if (cmdOrCtrl && e.shiftKey && e.key === "N")
      setIsAddProjectModalOpen(true);
  }, []);

  useEffect(() => {
    fetchAndUpdateData();
    window.addEventListener("keydown", keydownHandler);

    () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [keydownHandler]);

  const fetchAndUpdateData = () => {
    fetch("/api/project")
      .then((res) => res.json())
      .then((res) => {
        setProjects(res.data);
      });
  };

  const onDropProject = (project: WithId<Project>) => {
    if (!projects) return;
    const updatedProjects: GetAllProjectsResponseData = { ...projects };
    if (updatedProjects.activeProjects && updatedProjects.deadProjects) {
      const keyToIncrement =
        project.status === "active" ? "activeProjects" : "deadProjects";
      const keyToDecrement =
        project.status === "active" ? "deadProjects" : "activeProjects";

      updatedProjects[keyToIncrement].push(project);

      const index = updatedProjects[keyToDecrement].findIndex(
        ({ _id }) => _id === project._id
      );
      if (index === -1) return;
      updatedProjects[keyToDecrement].splice(index, 1);
    }
    setProjects(updatedProjects);
  };

  if (!projects) return <Spinner />;
  return (
    <div className={commonStyles.container}>
      <div
        className={
          isAddProjectModalOpen ? commonStyles.blurContainer : undefined
        }
      >
        <Header onAddProjectClick={() => setIsAddProjectModalOpen(true)} />
        <div className={`${styles.container} ${commonStyles.container}`}>
          <DndProvider backend={HTML5Backend}>
            <Graveyard
              projects={projects.deadProjects}
              onDropProject={onDropProject}
            />
            <ActiveProjects
              projects={projects.activeProjects}
              onDropProject={onDropProject}
            />
          </DndProvider>
        </div>
      </div>
      {isAddProjectModalOpen && (
        <CenteredModal>
          <AddProject
            setIsAddProjectModalOpen={() => setIsAddProjectModalOpen(true)}
          />
        </CenteredModal>
      )}
    </div>
  );
};

export default Home;
