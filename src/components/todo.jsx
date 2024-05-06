import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./todo.css";
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, removeTodo, updateTodo, completeTodo } from "../redux";

export default function TodoList() {
  const currenttodos = useSelector(state => state.todos.todos);
  const dispatch = useDispatch();

  const headerStyle = {
    padding: "20px 0",
    lineHeight: "1.5em",
  };

  const [state, setState] = useState({
    title: "",
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

  const handleChange = (id) => {
    dispatch(completeTodo(id));
  };

  const delTodo = (id) => {
    dispatch(removeTodo(id));
  };

  const addTodoItem = (title) => {
    const newTodo = {
      id: uuidv4(),
      title: title,
      completed: false,
    };
    dispatch(addTodo(newTodo));
    setState({
      ...state,
      title: "",
    });
  };

  const setUpdate = (updatedTitle, id) => {
    const payload = {
      id: id,
      title: updatedTitle
    }
    dispatch(updateTodo(payload));
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
      <div className="todocontainer">
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
            {currenttodos.map((todo) => (
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
