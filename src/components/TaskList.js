import TaskItem from "./TaskItem"
function TaskList ({tasks, handleChangeStatus, handleDeleteTask}) {
    return (
        <ul>
            {tasks.map(({id, name, status}) => (
                <TaskItem
                    key={id}
                    id={id}
                    name={name}
                    status={status}
                    handleChangeStatus={handleChangeStatus}
                    handleDeleteTask={handleDeleteTask}
                />
                ))}
        </ul>
    )
}

export default TaskList