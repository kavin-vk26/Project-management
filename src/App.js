import React, { useState } from 'react';
import './styles.css';

const initialProjects = [
  {
    id: 1,
    title: 'Website Redesign',
    description: 'Update the company website with a new look and feel.',
    status: 'In Progress',
    owner: 'Krishna',
    tasks: [
      { id: 1, assignee: 'Raj', description: 'Design homepage' },
      { id: 2, assignee: 'Sukesh', description: 'Update logo' }
    ]
  },
  {
    id: 2,
    title: 'Mobile Application',
    description: 'Create the new mobile app for Android and iOS.',
    status: 'Completed',
    owner: 'Bala',
    tasks: []
  }
];

function App() {
  const [projects, setProjects] = useState(initialProjects);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'In Progress',
    owner: ''
  });
  const [taskInputs, setTaskInputs] = useState({});
  const [editingTask, setEditingTask] = useState({});
  const [editTaskInputs, setEditTaskInputs] = useState({});

  // Project form handlers
  const handleAddClick = () => {
    setEditId(null);
    setForm({
      title: '',
      description: '',
      status: 'In Progress',
      owner: ''
    });
    setShowForm(true);
  };

  const handleEdit = (id) => {
    const project = projects.find(p => p.id === id);
    setEditId(id);
    setForm({
      title: project.title,
      description: project.description,
      status: project.status,
      owner: project.owner
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.owner.trim()) {
      alert('Title and Owner are required.');
      return;
    }
    if (editId) {
      setProjects(projects.map(p =>
        p.id === editId ? { ...p, ...form } : p
      ));
    } else {
      setProjects([
        ...projects,
        { ...form, id: Date.now(), tasks: [] }
      ]);
    }
    setShowForm(false);
    setEditId(null);
    setForm({
      title: '',
      description: '',
      status: 'In Progress',
      owner: ''
    });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditId(null);
    setForm({
      title: '',
      description: '',
      status: 'In Progress',
      owner: ''
    });
  };

  // Task handlers
  const handleTaskInputChange = (projectId, e) => {
    setTaskInputs({
      ...taskInputs,
      [projectId]: {
        ...taskInputs[projectId],
        [e.target.name]: e.target.value
      }
    });
  };

  const handleAddTask = (projectId) => {
    const task = taskInputs[projectId];
    if (!task || !task.assignee || !task.description) {
      alert('Assignee and Task Description are required.');
      return;
    }
    setProjects(projects.map(p =>
      p.id === projectId
        ? {
            ...p,
            tasks: [
              ...p.tasks,
              {
                id: Date.now(),
                assignee: task.assignee,
                description: task.description
              }
            ]
          }
        : p
    ));
    setTaskInputs({
      ...taskInputs,
      [projectId]: { assignee: '', description: '' }
    });
  };

  const handleDeleteTask = (projectId, taskId) => {
    setProjects(projects.map(p =>
      p.id === projectId
        ? { ...p, tasks: p.tasks.filter(t => t.id !== taskId) }
        : p
    ));
  };

  // Edit task handlers
  const handleEditTaskClick = (projectId, task) => {
    setEditingTask({ ...editingTask, [projectId]: task.id });
    setEditTaskInputs({
      ...editTaskInputs,
      [projectId]: {
        assignee: task.assignee,
        description: task.description
      }
    });
  };

  const handleEditTaskInputChange = (projectId, e) => {
    setEditTaskInputs({
      ...editTaskInputs,
      [projectId]: {
        ...editTaskInputs[projectId],
        [e.target.name]: e.target.value
      }
    });
  };

  const handleUpdateTask = (projectId, taskId) => {
    const updated = editTaskInputs[projectId];
    if (!updated.assignee || !updated.description) {
      alert('Assignee and Task Description are required.');
      return;
    }
    setProjects(projects.map(p =>
      p.id === projectId
        ? {
            ...p,
            tasks: p.tasks.map(t =>
              t.id === taskId
                ? { ...t, assignee: updated.assignee, description: updated.description }
                : t
            )
          }
        : p
    ));
    setEditingTask({ ...editingTask, [projectId]: null });
    setEditTaskInputs({ ...editTaskInputs, [projectId]: { assignee: '', description: '' } });
  };

  const handleCancelEditTask = (projectId) => {
    setEditingTask({ ...editingTask, [projectId]: null });
    setEditTaskInputs({ ...editTaskInputs, [projectId]: { assignee: '', description: '' } });
  };

  // Project status change handler
  const handleStatusChange = (projectId, newStatus) => {
    setProjects(projects.map(p =>
      p.id === projectId ? { ...p, status: newStatus } : p
    ));
  };

  return (
    <div>
      <header>
        <div className="header-title">Online Project Management</div>
      </header>
      <div className="container">
        <h1>Projects</h1>
        <button className="add-project-btn" onClick={handleAddClick}>+ Add Project</button>
        {showForm && (
          <form onSubmit={handleSubmit}>
            <input
              name="title"
              placeholder="Project Title"
              value={form.title}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
            />
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option>In Progress</option>
              <option>Completed</option>
              <option>On Hold</option>
            </select>
            <input
              name="owner"
              placeholder="Owner"
              value={form.owner}
              onChange={handleChange}
              required
            />
            <div>
              <button type="submit">{editId ? 'Update' : 'Add'}</button>
              <button type="button" onClick={handleCancel} style={{marginLeft: '10px'}}>Cancel</button>
            </div>
          </form>
        )}
        <div className="project-list">
          {projects.map(project => (
            <div className="project-card" key={project.id}>
              <div className="project-title">{project.title}</div>
              <div className="project-desc">{project.description}</div>
              <div className="project-meta">
                Status:&nbsp;
                <select
                  value={project.status}
                  onChange={e => handleStatusChange(project.id, e.target.value)}
                  style={{
                    fontWeight: 600,
                    borderRadius: 4,
                    border: '1px solid #ccc',
                    padding: '2px 8px',
                    background: '#f8f6fa',
                    marginLeft: 2
                  }}
                >
                  <option>In Progress</option>
                  <option>Completed</option>
                  <option>On Hold</option>
                </select>
              </div>
              <div className="project-meta">Owner: {project.owner}</div>
              <div className="project-actions">
                <button className="action-btn edit-btn" onClick={() => handleEdit(project.id)}>Edit</button>
                <button className="action-btn delete-btn" onClick={() => handleDelete(project.id)}>Delete</button>
              </div>
              <div className="tasks-section">
                <strong>Tasks:</strong>
                <ul className="task-list">
                  {project.tasks.map(task => (
                    <li key={task.id} className="task-item">
                      {editingTask[project.id] === task.id ? (
                        <span className="task-edit-form">
                          <input
                            type="text"
                            name="assignee"
                            placeholder="Assignee"
                            value={editTaskInputs[project.id]?.assignee || ''}
                            onChange={e => handleEditTaskInputChange(project.id, e)}
                          />
                          <input
                            type="text"
                            name="description"
                            placeholder="Task Description"
                            value={editTaskInputs[project.id]?.description || ''}
                            onChange={e => handleEditTaskInputChange(project.id, e)}
                          />
                          <button
                            className="action-btn edit-btn"
                            style={{padding: '2px 8px', fontSize: '0.9em'}}
                            onClick={() => handleUpdateTask(project.id, task.id)}
                            type="button"
                          >
                            Save
                          </button>
                          <button
                            className="action-btn delete-btn"
                            style={{padding: '2px 8px', fontSize: '0.9em'}}
                            onClick={() => handleCancelEditTask(project.id)}
                            type="button"
                          >
                            Cancel
                          </button>
                        </span>
                      ) : (
                        <>
                          <span className="task-assignee">{task.assignee}:</span> <span className="task-desc">{task.description}</span>
                          <button
                            className="action-btn edit-btn"
                            style={{marginLeft: '10px', padding: '2px 8px', fontSize: '0.9em'}}
                            onClick={() => handleEditTaskClick(project.id, task)}
                            type="button"
                          >
                            Edit
                          </button>
                          <button
                            className="action-btn delete-btn"
                            style={{marginLeft: '5px', padding: '2px 8px', fontSize: '0.9em'}}
                            onClick={() => handleDeleteTask(project.id, task.id)}
                            type="button"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </li>
                  ))}
                  {project.tasks.length === 0 && <li style={{color: '#888'}}>No tasks yet.</li>}
                </ul>
                <div className="task-add-form">
                  <input
                    type="text"
                    name="assignee"
                    placeholder="Assignee"
                    value={taskInputs[project.id]?.assignee || ''}
                    onChange={e => handleTaskInputChange(project.id, e)}
                  />
                  <input
                    type="text"
                    name="description"
                    placeholder="Task Description"
                    value={taskInputs[project.id]?.description || ''}
                    onChange={e => handleTaskInputChange(project.id, e)}
                  />
                  <button
                    className="action-btn edit-btn"
                    type="button"
                    onClick={() => handleAddTask(project.id)}
                  >
                    Add Task
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;