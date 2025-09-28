import React, { useState, useContext } from "react";
import { ProjectContext } from "../context/ProjectContext";

const AddProjectForm = () => {
  const { projects, setProjects } = useContext(ProjectContext);
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;

    setProjects([
      ...projects,
      { id: Date.now(), name, tasks: [] }
    ]);
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <input
        type="text"
        placeholder="New Project Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit">Add Project</button>
    </form>
  );
};

export default AddProjectForm;
