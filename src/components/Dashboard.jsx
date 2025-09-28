import React, { useContext } from "react";
import { ProjectContext } from "../context/ProjectContext";
import ProjectList from "./ProjectList";
import AddProjectForm from "./AddProjectForm";

const Dashboard = () => {
  const { projects } = useContext(ProjectContext);

  return (
    <div>
      <AddProjectForm />
      {projects.length === 0 ? (
        <p>No projects added yet.</p>
      ) : (
        <ProjectList />
      )}
    </div>
  );
};

export default Dashboard;
