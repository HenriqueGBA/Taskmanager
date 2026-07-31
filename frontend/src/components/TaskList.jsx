import api from "../services/api";

function TaskList({ tasks, loadTasks }) {

    function deleteTask(id) {

        api.delete(`/tasks/${id}`)

            .then(() => {

                loadTasks();

            })

            .catch(console.log);

    }

    return (

        <div>

            <h2>Lista de tarefas</h2>

            <table border="1" cellPadding="10">

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Título</th>
                        <th>Descrição</th>
                        <th>Status</th>
                        <th>Ações</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        tasks.map(task => (

                            <tr key={task.id}>

                                <td>{task.id}</td>

                                <td>{task.title}</td>

                                <td>{task.description}</td>

                                <td>

                                    {task.completed ? "Concluída" : "Pendente"}

                                </td>

                                <td>

                                    <button
                                        onClick={() => deleteTask(task.id)}
                                    >

                                        Excluir

                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    )

}

export default TaskList;