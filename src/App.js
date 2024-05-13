//app based on: https://todomvc.com/examples/react/dist/
import './App.css';
import { useEffect, useState } from "react";
import {collection, getDocs, addDoc, updateDoc} from 'firebase/firestore';
import { saveToLocalStorage, loadFromLocalStorage } from './utils/localStorage';
import uuidGen from './utils/uuid';
import Headline from './components/Headline'
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import ItemsLength from './components/ItemsLength';
import SelectionButtons from './components/SelectionButtons';
import ClearButton from './components/ClearButton';
import firebase, { db } from './firebase';



function App() {
    const [value, setValue] = useState('');
    const [tasks, setTasks] = useState([]);
    const [selection, setSelection] = useState('all');

    //pobieramy dane i wyswitelamy z dane z naszej bazy danych:
    const getData = async () => {
        const querySnapshot = await getDocs(collection(db, "todos"));
        setTasks(querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })))
    }

    //pobieramy dane z db:  
    useEffect(() => {
       getData()
    }, []);

    useEffect(() => {
        setTasks(loadFromLocalStorage('tds'));
    }, []);

    useEffect(() => {
        saveToLocalStorage('tds', tasks);
    }, [tasks])

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    //zapisywanie danych w db, ktore wpisze uzytkownik
    const handleKeyUp = async (event) => {
        if (event.key === 'Enter') {

            const newTodo = {
                name: value,
                status: false
            };
            const docRef = await addDoc(collection(db, "todos"), newTodo)
            
            setTasks([Object.assign(newTodo, {
                id: docRef.id
            }), ...tasks]);
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

