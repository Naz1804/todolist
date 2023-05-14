import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import List from "./component/List"
import Tab from "./component/Tab"

function App() {
    const [todos, setTodos] = useState(loadTodosFromLocalStorage())
    const [inputValue, setInputValue] = useState('')
    const [count, setCount] = useState(0)
    const [tabs, setTabs] = useState(false)
    const [filter, setFilter] = useState("All");
    const [filteredTodos, setFilteredTodos] = useState(todos);
    const [lightMode, setLightMode] = useState(false)

    const [draggedItemIndex, setDraggedItemIndex] = useState(null);
    const [dragOverItemIndex, setDragOverItemIndex] = useState(null);

    function toggleLightMode() {
        setLightMode(!lightMode)
    }

    function handleInputChange(event) {
        setInputValue(event.target.value)
    }

    function addToDo(event) {
        if(event.key === "Enter") {
            if(inputValue.trim() === "") {
                return
            }
            setTodos([...todos, { text: inputValue, completed: false, id: uuidv4()}])
            setInputValue('')
            setTabs(true)
        }
    }

    const handleTodoClick = (id) => {
        const todoIndex = todos.findIndex((todo) => todo.id === id);
        const newTodos = [...todos];
        newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
        setTodos(newTodos);

        setCount([...todos].filter((todo) => !todo.completed).length)
    };
    
    const handleDeleteClick = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
        localStorage.removeItem(id)

        const newTodos = [...todos];
        setCount(newTodos.filter((todo) => !todo.completed).length)
    };

    useEffect(() => {
        setCount(todos.filter((todo) => !todo.completed).length)

        setTabs(todos.length ? true : false)

        setFilteredTodos(todos)

        if (filter === "Active") {
            setFilteredTodos(todos.filter((todo) => !todo.completed))
        } else if (filter === "Completed") {
            setFilteredTodos(todos.filter((todo) => todo.completed))
        }

        saveTodosToLocalStorage(todos)
    }, [todos])

    function handleRemove() {
        const newTodos = todos.filter((todo) => !todo.completed)
        localStorage.removeItem(todos.filter((todo) => !todo.completed))
        setTodos(newTodos)
    }

    function handleFilter(selectedFilter) {
        setFilter(selectedFilter)
        setFilteredTodos(todos.filter((todo) => selectedFilter === "Completed" ? todo.completed : selectedFilter === "Active" ? !todo.completed : true))
    }

    const handleDrop = (event, index) => {
        event.preventDefault();
        const newFilteredTodos = [...todos];
        const draggedItem = newFilteredTodos[draggedItemIndex];
        newFilteredTodos.splice(draggedItemIndex, 1);
        newFilteredTodos.splice(index, 0, draggedItem);
        setTodos(newFilteredTodos);
    };
    const handleDragStart = (event, index) => {
        setDraggedItemIndex(index);
    };
    const handleDragOver = (event, index) => {
        event.preventDefault();
        setDragOverItemIndex(index);
    };

    function loadTodosFromLocalStorage() {
        const todos = localStorage.getItem('todos');
        return todos ? JSON.parse(todos) : [];
    }
    function saveTodosToLocalStorage(todos) {
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    
    return (
        <main className={lightMode ? "light" : ""}>
           <div className="image"></div>
            <div className="container">
             <header>
                <h1>Todo</h1>
                <button className="theme-mode" type="button" onClick={toggleLightMode}></button>
             </header>
             
             <div className="input-wrap">
                <input type="text" value={inputValue} onChange={handleInputChange} onKeyDown={addToDo} placeholder="Create a new todo..." className="circle-input"/>
             </div>

             <section>
                <List 
                   filteredTodos={filteredTodos} 
                   handleTodoClick={handleTodoClick} 
                   handleDeleteClick={handleDeleteClick} 
                   handleDrop={handleDrop} 
                   handleDragStart={handleDragStart} 
                   handleDragOver={handleDragOver} 
                />
                {tabs && <Tab count={count} handleRemove={handleRemove} handleFilter={handleFilter} filter={filter} />}
             </section>
             {tabs && <div className="tag"><a target="_blank" href="https://icons8.com/icon/48003/done">Check Logo</a><a target="_blank" href="https://icons8.com"> by Icons8</a></div>}
             </div>
        </main>
    )
}
export default App