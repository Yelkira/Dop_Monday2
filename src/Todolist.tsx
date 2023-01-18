import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TasksType} from './App';
import {Button} from "./Components/Button";


// export type TaskType = {
//     id: string
//     title: string
//     isDone: boolean
// }

type PropsType = {
    id: number
    title: string
    tasks: Array<TasksType>
    students: Array<string>
    removeTask: (taskId: string, todolistId: number) => void
    changeFilter: (value: FilterValuesType, todolistId: number) => void
    addTask: (title: string, todolistId: number) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: number) => void
    removeTodolist: (id: number) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === "Enter") {
            addTaskHandler()
        }
    }

    const removeTodoList = () => {
        props.removeTodolist(props.id)
    }
    const removeTask = (t: string) => {
        props.removeTask(t, props.id)
    }
    const addTaskHandler = () => {
        props.addTask(title, props.id)
        setTitle("")
    }
    const  changeFilterHandler = (value:FilterValuesType)=>{
        props.changeFilter(value ,props.id)
    }
    return <div>
        <h3> {props.title}
            <Button name={"x"} callback={removeTodoList}/>
        </h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <Button name={"+"} callback={addTaskHandler}/>
            {error && <div className="error-message">{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.taskId, newIsDoneValue, props.id);
                    }

                    return <li key={t.taskId} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                        <span>{t.title}</span>
                        <Button name={"x"} callback={() => removeTask(t.taskId)}/>
                    </li>
                })
            }
        </ul>
        <div>
            <Button name={"All"} callback={()=>changeFilterHandler("All")}/>
            <Button name={"Active"} callback={()=>changeFilterHandler("Active")}/>
            <Button name={"Completed"} callback={()=>changeFilterHandler("Completed")}/>
        </div>
        <p></p>
        {
            props.students.map((el) => {
                return (
                    <div>{el}</div>
                )
            })
        }
    </div>
}


