import TaskItem from "./TaskItem"
function TaskList ({tasks, selection}) {

    return (
        <ul>
            {tasks.filter(e => selection === 'all' || e.status === selection).map(({id, name, status}) => (
                <TaskItem
                    key={id}
                    id={id}
                    name={name}
                    status={status}
                />
                ))}
        </ul>
    )
}

export default TaskList