import React from "react";

const TaskCard = ({ task }) => {
  return (
    <div style={{ border: "1px solid #ddd", padding: "0.5rem", marginTop: "0.5rem" }}>
      <h4>{task.title}</h4>
      <p>Status: {task.status || "pending"}</p>
      <p>Assignee: {task.assignee || "Unassigned"}</p>
    </div>
  );
};

export default TaskCard;