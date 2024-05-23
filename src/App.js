//app based on: https://todomvc.com/examples/react/dist/
import './App.scss';
import { useEffect, useState } from "react";
import {collection, onSnapshot } from 'firebase/firestore';
import Headline from './components/Headline'
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import ItemsLength from './components/ItemsLength';
import SelectionButtons from './components/SelectionButtons';
import ClearButton from './components/ClearButton';
import { db } from './firebase';



function App() {
    const [tasks, setTasks] = useState([]);
    const [selection, setSelection] = useState('all');

    //pobieramy dane z db i wyswitelamy z dane z naszej bazy danych oraz updatujemy automatyznie stan 
    useEffect(() => {
       const unsubscribe = onSnapshot(collection(db, 'todos'), (snapshot) => {
        setTasks(snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        })))
       })
       return () => {
        unsubscribe()
       }
    }, []);


    return (
        <div className="App">
            <Headline />
            <TaskInput/>
            {tasks.length === 0 ? ('') : (
            <>
            <TaskList
            tasks={tasks}
            selection={selection}
            />
            <ItemsLength tasks={tasks}/>
            <SelectionButtons setSelection={setSelection}/>
            <ClearButton tasks={tasks}/>
            </>)
            }
        </div>
    );
}

export default App;

