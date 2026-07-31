import { useEffect, useState } from "react";
import api from "./services/api";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  function loadTasks() {
    api.get("/tasks")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div style={{ width: "700px", margin: "30px auto" }}>
      <h1>Task Manager</h1>

      <TaskForm loadTasks={loadTasks} />

      <hr />

      <TaskList
        tasks={tasks}
        loadTasks={loadTasks}
      />
    </div>
  );
}

export default App;