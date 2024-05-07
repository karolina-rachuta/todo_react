function TaskItem({id, status, name, handleChangeStatus, handleDeleteTask}) {
    return (
        <li className='todo-item'>
            <span
                className={status ? 'status done' : 'status active'}
                onClick={() => handleChangeStatus(id)}
            />
            <span contentEditable='true'>{name}</span>
            <button onClick={() => handleDeleteTask(id)}>x</button>
        </li>
    )
}

export default TaskItem;