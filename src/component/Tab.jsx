export default function Tab({count, handleRemove, handleFilter, filter}) {
    return (
        <>
          <div className="filter">
            <p>{count} {count === 1 ? "item" : "items"} left</p>
            <div className="bg-tabs-btn">
                <button className={filter === "All" ? "Active" : "tabs-btn"} onClick={() => handleFilter("All")}>All</button>
                <button className={filter === "Active" ? "Active" : "tabs-btn"} onClick={() => handleFilter("Active")}>Active</button>
                <button className={filter === "Completed" ? "Active" : "tabs-btn"} onClick={() => handleFilter("Completed")}>Completed</button>
            </div>
            <button onClick={handleRemove} className="clr-btn">Clear Completed</button>
          </div>

          <div className="sml-tabs-btn">
                <button className={filter === "All" ? "Active" : "tabs-btn"} onClick={() => handleFilter("All")}>All</button>
                <button className={filter === "Active" ? "Active" : "tabs-btn"} onClick={() => handleFilter("Active")}>Active</button>
                <button className={filter === "Completed" ? "Active" : "tabs-btn"} onClick={() => handleFilter("Completed")}>Completed</button>
          </div>
            <p className="footer">Drag and drop to reorder list</p>
        </>
    )
}