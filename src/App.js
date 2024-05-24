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
            <div className='container'>
                <TaskInput/>
                {tasks.length === 0 ? ('') : (
                <>
                <TaskList
                tasks={tasks}
                selection={selection}
                />
                <div className='utils'>
                    <ItemsLength tasks={tasks}/>
                    <SelectionButtons setSelection={setSelection} selection={selection}/>
                    <div>
                        <ClearButton tasks={tasks}/>
                    </div>
                </div>
                </>)
                }
            </div>
        </div>
    );
}

export default App;

