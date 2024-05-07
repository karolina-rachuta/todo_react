function ClearButton({tasks, handleDeleteDone}){
    return(
        <>
        {tasks.filter((e) => e.status).length > 0 ? (<button onClick={handleDeleteDone}>Clear completed</button>) : ('')}
        </>
    )
}

export default ClearButton;