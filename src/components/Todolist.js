import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { useRef } from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function Todolist() {
  const [todo, setTodo] = useState({ description: "", date: "", priority: "" });
  const [todos, setTodos] = useState([]);
  const gridRef = useRef();

  const columns = [
    { field: "description", sortable: true, filter: true, floatingFilter: true},
    { field: "date", sortable: true, filter: true, floatingFilter: true },
    { field: "priority", sortable: true, filter: true, floatingFilter: true,
      cellStyle: (params) =>
        params.value === "High" ? { color: "red" } : { color: "black" },
    },
  ];

  const inputChanged = (event) => {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  };

  const deleteTodo = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(
        todos.filter(
          (todo, index) =>
            index !== gridRef.current.getSelectedNodes()[0].childIndex
        )
      );
    } else {
      alert("Select row first");
    }
  };

  const addTodo = (event) => {
    setTodos([...todos, todo]);
  };

  return (
    <div>
      <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" direction="row">
      <input
        type="text"
        onChange={inputChanged}
        placeholder="Description"
        name="description"
        value={todo.description}
      />
      <input
        type="date"
        onChange={inputChanged}
        placeholder="Date"
        name="date"
        value={todo.date}
      />
      <input
        type="text"
        onChange={inputChanged}
        placeholder="Priority"
        name="priority"
        value={todo.priority}
      />
      <Button variant= "contained" onClick={addTodo}>Add</Button>
      <Button variant= "contained" color="error" onClick={deleteTodo}>Delete</Button>
      </Stack>
      <div
        className="ag-theme-material"
        style={{ height: "700px", width: "70%", margin: "auto" }}
      >
        <AgGridReact
          ref={gridRef}
          animateRows="true"
          onGridReady={(params) => (gridRef.current = params.api)}
          rowSelection="single"
          columnDefs={columns}
          rowData={todos}
        ></AgGridReact>
      </div>
    </div>
  );
}

export default Todolist;