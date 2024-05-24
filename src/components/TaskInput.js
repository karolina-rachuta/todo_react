import { useState } from "react";
import {collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';


function TaskInput () {
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const handleKeyUp = async (event) => {
        if (event.key === 'Enter') {

            await addDoc(collection(db, "todos"), {
                name: value,
                status: false
            })

            setValue('');
        }
    }

    return (
        <input type="text"
                   value={value}
                   onChange={handleChange}
                   onKeyUp={handleKeyUp}
                   className="input"
                   placeholder="What needs to be done?"
            />
    )
}
export default TaskInput;