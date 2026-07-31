import { useState } from "react";
import api from "../services/api";

function TaskForm({ loadTasks }) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    function saveTask(e) {

        e.preventDefault();

        api.post("/tasks", {

            title,
            description

        }).then(() => {

            setTitle("");
            setDescription("");

            loadTasks();

        }).catch(console.log);

    }

    return (

        <form onSubmit={saveTask}>

            <h2>Nova tarefa</h2>

            <input
                type="text"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <br /><br />

            <textarea
                placeholder="Descrição"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <br /><br />

            <button>

                Salvar

            </button>

        </form>

    )

}

export default TaskForm;