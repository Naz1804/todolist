export default function List({filteredTodos, handleTodoClick, handleDeleteClick, handleDrop, handleDragStart, handleDragOver}) {
    return (
        <ul>
            {filteredTodos.map((todo, index) => (
                <li
                    key={todo.id}
                    draggable={true}
                    onDragStart={(event) => handleDragStart(event, index)}
                    onDragOver={(event) => handleDragOver(event, index)}
                    onDrop={(event) => handleDrop(event, index)}
                >
                    <button className={todo.completed ? "checkmark-fin" : "checkmark"} onClick={() => handleTodoClick(todo.id)}/>
                    <span className={todo.completed ? "completed" : ""}>{todo.text}</span>
                    <button className="delete-btn" onClick={() => handleDeleteClick(todo.id)}/>
                </li>
            ))}
        </ul>
    )
}