import './App.css';
import {useState} from "react";


function* uuidGen() {
    let id = 0;

    while (true) {
        yield id;
        id++
    }
}

//trzeba zintancjonowac generator
const uuid = uuidGen()

function App() {
    const [value, setValue] = useState('');
    const [tasks, setTasks] = useState([]);
    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const handleKeyUp = (event) => {
        if (event.key === 'Enter') {
            setTasks([...tasks, {
                name: value,
                id: uuid.next().value,
                status: false
            }])
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

    function handleDeleteTask (id) {
        setTasks(tasks.filter(task => task.id !== id))
    }

    return (
        <div className="App">
            <h1>todos</h1>
            <input type="text" value={value} onChange={handleChange} onKeyUp={handleKeyUp}/>
            <p>{value}</p>
            <ul>
                {tasks.map(({id, name, status}) => (
                    <li key={id} className='todo-item'>
                        <span className={status ? 'status done' : 'status active'}
                              onClick={() => handleChangeStatus(id)}/>
                        {name}
                        <button onClick={() => handleDeleteTask(id)}>X</button>
                    </li>
                ))}
            </ul>
        </div>

    );
}

export default App;
