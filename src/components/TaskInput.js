import { useState } from "react";
import {collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';


function TaskInput () {
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    //zapisywanie danych w db, ktore wpisze uzytkownik
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
            />
    )
}
export default TaskInput;