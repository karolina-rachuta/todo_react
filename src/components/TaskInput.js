function TaskInput ({val, handleChange, handleKeyUp}) {
    return (
        <input type="text"
                   value={val}
                   onChange={handleChange}
                   onKeyUp={handleKeyUp}
            />
    )
}
export default TaskInput;