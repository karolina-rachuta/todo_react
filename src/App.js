import './App.css';
import { useEffect, useState } from "react";
import { saveToLocalStorage, loadFromLocalStorage } from './utils/localStorage';
import uuidGen from './utils/uuid';
import Headline from './components/Headline'
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';



function App() {
    const [value, setValue] = useState('');
    const [tasks, setTasks] = useState([]);
    const [selection, setSelection] = useState('all');

    useEffect(() => {
        setTasks(loadFromLocalStorage('tds'));
    }, []);

    useEffect(() => {
        saveToLocalStorage('tds', tasks);
    }, [tasks])

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const handleKeyUp = (event) => {
        if (event.key === 'Enter') {
            setTasks([{
                name: value,
                id: uuidGen(),
                status: false
            }, ...tasks]);
            setValue('');
        }
    }


    function handleChangeStatus(id) {
        const newTasks = tasks.map(task => {
            if (task.id === id) {
                task.status = !task.status
            }
            return task
        })

        setTasks(newTasks);
    }

    function handleDeleteTask(id) {
        setTasks(tasks.filter(task => task.id !== id))
    }

    return (
        <div className="App">
            <Headline />
            <TaskInput
            val={value}
            handleChange={handleChange}
            handleKeyUp={handleKeyUp}
            />
            <TaskList
            tasks={tasks}
            handleChangeStatus={handleChangeStatus}
            handleDeleteTask={handleDeleteTask}
            selection={selection}
            />
            <div>
                <button onClick={()=> setSelection('all')}>All</button>
                <button onClick={()=> setSelection(false)}>Active</button>
                <button onClick={()=> setSelection(true)}>Completed</button>
            </div>
        </div>
    );
}

export default App;

