import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:5000/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (event) => {
    event.preventDefault();

    if (!title.trim()) return;

    try {
      await axios.post(API_URL, {
        title,
        description,
      });

      setTitle("");
      setDescription("");

      fetchTasks();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const toggleTask = async (task) => {
    try {
      await axios.put(`${API_URL}/${task._id}`, {
        completed: !task.completed,
      });

      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);

      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>CloudNativeHub</h1>
        <p> Task Manager</p>
      </header>

      <main className="container">

        <section className="card">
          <h2>Create New Task</h2>

          <form onSubmit={addTask}>
            <input
              type="text"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              placeholder="Task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button type="submit">
              Add Task
            </button>
          </form>
        </section>

        <section className="card">
          <h2>My Tasks</h2>

          {tasks.length === 0 ? (
            <p className="empty">
              No tasks available.
            </p>
          ) : (
            tasks.map((task) => (
              <div
                className={`task ${
                  task.completed ? "completed" : ""
                }`}
                key={task._id}
              >
                <div>
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                </div>

                <div className="actions">
                  <button onClick={() => toggleTask(task)}>
                    {task.completed ? "Undo" : "Complete"}
                  </button>

                  <button
                    className="delete"
                    onClick={() => deleteTask(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </section>

      </main>
    </div>
  );
}

export default App;