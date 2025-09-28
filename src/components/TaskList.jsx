import React from "react";
import TaskCard from "./TaskCard";

const TaskList = ({ project }) => {
  return (
    <div style={{ marginTop: "1rem" }}>
      {project.tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        project.tasks.map((task) => <TaskCard key={task.id} task={task} project={project} />)
      )}
    </div>
  );
};

export default TaskList;