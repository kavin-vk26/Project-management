import React, { useContext } from "react";
import { ProjectContext } from "../context/ProjectContext";
import ProjectCard from "./ProjectCard";

const ProjectList = () => {
  const { projects } = useContext(ProjectContext);

  return (
    <div>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectList;