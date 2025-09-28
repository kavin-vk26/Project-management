import React, { useState, useContext } from "react";
import { ProjectContext } from "../context/ProjectContext";

const AddTaskForm = ({ project }) => {
  const { projects, setProjects } = useContext(ProjectContext);
  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    const updatedProjects = projects.map((p) => {
      if (p.id === project.id) {
        return {
          ...p,
          tasks: [...p.tasks, { id: Date.now(), title, assignee, status: "pending" }]
        };
      }
      return p;
    });

    setProjects(updatedProjects);
    setTitle("");
    setAssignee("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Assignee"
        value={assignee}
        onChange={(e) => setAssignee(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTaskForm;
