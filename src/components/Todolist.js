import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { useRef } from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import Tabs from'@mui/material/Tabs';
import Tab from'@mui/material/Tab';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

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

  const [value, setValue] = useState('one');
    const handleChange = (event, value) => {  setValue(value);};

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
        <Tabs value={value}onChange={handleChange}>
        <Tab value="one"label="Home" />
        <Tab value="two"label="Todos" />
        </Tabs>
        {value === 'one' && <div>Welcome to TodoApp, to get started click on the Todos!</div>}
        {value === 'two' && <div>
        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
      <TextField
        type="text"
        onChange={inputChanged}
        placeholder="Description"
        name="description"
        value={todo.description}
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
          label="Date"
          inputFormat="dd/MM/yyyy"
          value={todo.date}
          onChange={dateFromPicker => setTodo({ ...todo, date: dateFromPicker})}
          renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>
      <TextField
        type="text"
        onChange={inputChanged}
        placeholder="Priority"
        name="priority"
        value={todo.priority}
      />
      <Button variant= "contained" startIcon={<AddIcon/>} onClick={addTodo}>Add</Button>
      <Button variant= "contained" color="error" startIcon={<DeleteIcon/>} onClick={deleteTodo}>Delete</Button>
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
        </div>}
    </div>
  );
}

export default Todolist;