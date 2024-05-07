//https://todomvc.com/examples/react/dist/
import './App.css';
import { useEffect, useState } from "react";
import { saveToLocalStorage, loadFromLocalStorage } from './utils/localStorage';
import uuidGen from './utils/uuid';
import Headline from './components/Headline'
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import ItemsLength from './components/ItemsLength';
import SelectionButtons from './components/SelectionButtons';
import ClearButton from './components/ClearButton';



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

    function handleDeleteDone() {
    setTasks(tasks.filter(task => !task.status))
    }

    return (
        <div className="App">
            <Headline />
            <TaskInput
            val={value}
            handleChange={handleChange}
            handleKeyUp={handleKeyUp}
            />
            {tasks.length === 0 ? ('') : (
            <>
            <TaskList
            tasks={tasks}
            handleChangeStatus={handleChangeStatus}
            handleDeleteTask={handleDeleteTask}
            selection={selection}
            />
            <ItemsLength tasks={tasks}/>
            <SelectionButtons setSelection={setSelection}/>
            <ClearButton tasks={tasks} handleDeleteDone={handleDeleteDone}/>
            </>)
            }
        </div>
    );
}

export default App;

