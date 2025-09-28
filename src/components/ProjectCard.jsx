import React, { useState } from "react";
import TaskList from "./TaskList";
import AddTaskForm from "./AddTaskForm";

const ProjectCard = ({ project }) => {
  const [showTasks, setShowTasks] = useState(false);

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
      <h3>{project.name}</h3>
      <button onClick={() => setShowTasks(!showTasks)}>
        {showTasks ? "Hide Tasks" : "Show Tasks"}
      </button>
      {showTasks && (
        <>
          <AddTaskForm project={project} />
          <TaskList project={project} />
        </>
      )}
    </div>
  );
};

export default ProjectCard;