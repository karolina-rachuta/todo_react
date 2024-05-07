import './App.css';
import {
    useEffect,
    useState
} from "react";


const uuidGen = () => Math.max(...loadFromLocalStorage('tds').map(e => e.id), 0)+1;


// //trzeba zintancjonowac generator
// const uuid = uuidGen()


// nie w App bo te funckje by sie ciagle musialy renderowac
const loadFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    if (data !== null) {
        return JSON.parse(data);
    }
    return []
}

const saveToLocalStorage = (key, data) => {
localStorage.setItem(key, JSON.stringify(data))
}


function App() {
    const [value, setValue] = useState('');
    const [tasks, setTasks] = useState([]);


    useEffect(() => {
        setTasks(loadFromLocalStorage('tds'))
    }, []);

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const handleKeyUp = (event) => {
        if (event.key === 'Enter') {
            //gdybysmy nie uzyli zmiennej tylko wrzucili do setTasks
            //cala tablice, to przy saveTomLocalStrage by sie dodawalo
            //czesc rzeczy, bo setTasks jest asynchroniczne
            //saveToLocalStorage- tez jest asynchroniczne
            const newTask = [{
                name: value,
                id: uuidGen(),
                status: false
            }, ...tasks];
            setTasks(newTask);
            setValue('');
            saveToLocalStorage('tds', newTask)
        }
    }

    function handleChangeStatus(id) {
        //tworzymy nowa tablice
        const newTasks = tasks.map((task) => {
            if (task.id === id) {
                task.status = !task.status
            }
            return task
        })
        setTasks((newTasks));
    }

    function handleDeleteTask(id) {
        const newTasks = tasks.filter(task => task.id !== id);
        setTasks(newTasks);
        saveToLocalStorage('tds', newTasks)
    }

    return (
        <div className = "App" >
            <h1> todos </h1>
            <input type = "text"
            value = {value}
            onChange = {handleChange}
            onKeyUp = {handleKeyUp}/>
            <p> {value} </p>
            <ul> {tasks.map(({id,name,status}) => (
                <li key = {id} className = 'todo-item' >
                    <span className = {status ? 'status done' : 'status active'} onClick = {() => handleChangeStatus(id)}/>
                    {name}
                    <button onClick = {() => handleDeleteTask(id)} > X </button>
                </li>
            ))}
            </ul>
        </div>
        );
}

export default App;