import React, {useEffect, useState} from "react"

function ToDoList(){
    const [x, setX] = useState([])
    const tasksData =localStorage.getItem("tasks")
    const [tasks, setTasks] = useState((tasksData && tasksData.length!==0)?tasksData.split(","):[ "Eat Breakfast", "Take a shower", "Walk teh dog"]);
    const [newtasks, setNewTasks] = useState("");

//     useEffect(
//         async()=>{
// await  fetch('https://jsonplaceholder.typicode.com/todos/1')
//       .then(response => response.json())
//       .then(json => console.log(json))
//     }
//     ,[x])
//     console.log("tasks new values are", tasks)

    function handleInputChange(event){
        setNewTasks(event.target.value);

    }

    function addTask(){

        if(newtasks.trim() !== ""){
            setTasks(prev => [...prev, newtasks]);
            const dataToSave = [...tasks, newtasks]
            localStorage.setItem("tasks",dataToSave )
            setNewTasks("");
        }
        
    }

    function deleteTask(index){
        const updatedTasks = tasks.filter((element, i) => i !== index);
        localStorage.setItem("tasks",updatedTasks )
        setTasks(updatedTasks);

    }

    function moveTaskUp(index){
        if(index > 0){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index-1]] = [updatedTasks[index-1], updatedTasks[index]];
            setTasks(updatedTasks);
        }

    }

    function moveTaskDown(index){
        if(index < tasks.length - 3 ){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]]= [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }

    }

    return(
    <div className="to-do-list">

        <h1>To-Do-List</h1>

        <div>
            <input
                type="text"
                placeholder="Enter a task..."
                value={newtasks}
                onChange={handleInputChange}/>
            <button className="add-button" onClick={addTask}>
                Add
            </button>
        </div>

        <ol>
            {tasks.map((task, index) =>
                <li key={index}>
                    <span className="text">{task}</span>
                    <button
                        className="delete-button"
                        onClick={() => deleteTask(index)}>
                        Delete
                    </button>
                    <button
                        className="move-button"
                        onClick={() => moveTaskUp(index)}>
                       ☝🏾
                    </button>
                    <button
                        className="move-button"
                        onClick={() => moveTaskDown(index)}>
                       👇🏾
                    </button>
                </li>
            )} 
        </ol>

    </div>);
}
export default ToDoList