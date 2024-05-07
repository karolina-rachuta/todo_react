import './App.css';
import {
    useEffect,
    useState
} from "react";


const uuidGen = () => Math.max(...loadFromLocalStorage('tds').map(e => e.id), 0) + 1;

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

// za kazdym razem jak sie stan taskow zmieni to trzeba zmienic local storage
//za usunieciem, dodaniem i zmiena statusu
    useEffect(() => {
        saveToLocalStorage('tds', tasks)
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
        setTasks(tasks.filter(task => task.id !== id));
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