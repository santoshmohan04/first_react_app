import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./todo.css";

export default function TodoList(props) {
  const headerStyle = {
    padding: "20px 0",
    lineHeight: "1.5em",
  };

  const [state, setState] = useState({
    title: "",
    todos: getInitialTodos(),
    editing: false,
  });

  const onChange = (e) => {
    setState({
      ...state,
      title: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.title) {
      addTodoItem(state.title);
    } else {
      alert("Please write item");
    }
  };

  useEffect(() => {
    // storing todos items
    const temp = JSON.stringify(state.todos);
    localStorage.setItem("todos", temp);
    props.getTotalList(state.todos);
  }, [state.todos]);

  function getInitialTodos() {
    // getting stored items
    const temp = localStorage.getItem("todos");
    const savedTodos = JSON.parse(temp);
    return savedTodos || [];
  }

  const handleChange = (id) => {
    setState(() => ({
      ...state,
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      }),
    }));
  };

  const delTodo = (id) => {
    setState({
      ...state,
      todos: [
        ...state.todos.filter((todo) => {
          return todo.id !== id;
        }),
      ],
    });
  };

  const addTodoItem = (title) => {
    const newTodo = {
      id: uuidv4(),
      title: title,
      completed: false,
    };
    setState({
      ...state,
      title: "",
      todos: [...state.todos, newTodo],
    });
  };

  const setUpdate = (updatedTitle, id) => {
    setState({
      ...state,
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          todo.title = updatedTitle;
        }
        return todo;
      }),
    });
  };

  const handleEditing = () => {
    setState({
      ...state,
      editing: true,
    });
  };

  const handleUpdatedDone = (event) => {
    if (event.key === "Enter") {
      setState({ ...state, editing: false });
    }
  };

  const completedStyle = {
    fontStyle: "italic",
    color: "#595959",
    opacity: 0.4,
    textDecoration: "line-through",
  };

  let viewMode = {};
  let editMode = {};

  if (state.editing) {
    viewMode.display = "none";
  } else {
    editMode.display = "none";
  }

  return (
    <React.Fragment>
      <div className="container">
        <div className="inner">
          <div style={headerStyle}>
            <h1>todos</h1>
          </div>
          <form onSubmit={handleSubmit} className="form-container">
            <input
              type="text"
              className="input-text"
              placeholder="Add todo..."
              value={state.title}
              name="title"
              onChange={onChange}
            />
            <button className="input-submit">Submit</button>
          </form>
          <ul>
            {state.todos.map((todo) => (
              <li className={styles.item} key={todo.id}>
                <div
                  onDoubleClick={handleEditing}
                  style={viewMode}
                  className="d-flex gap-2 mb-2"
                >
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={todo.completed}
                    onChange={() => handleChange(todo.id)}
                  />
                  <span style={todo.completed ? completedStyle : null}>
                    {todo.title}
                  </span>
                  <input
                    type="text"
                    style={editMode}
                    className={styles.textInput}
                    value={todo.title}
                    onChange={(e) => {
                      setUpdate(e.target.value, todo.id);
                    }}
                    onKeyDown={handleUpdatedDone}
                  />
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() => delTodo(todo.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
}
