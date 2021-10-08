import axios from '../axios';
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Error from "./Error";

const TodoForm = () => {
  const [todoValue, setTodoValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(false);

  const todosLength = () => {
    let length = todos.length;

    switch (length) {
      case 0:
        return <b>No todos!</b>
      case 1:
        return <b>1 thing to do!</b>
      default:
        return <b>{todos.length} things to do!</b>
    }
  }

  // Sets the value of the todo
  const handleInputChange = (e) => {
    let value = e.target.value;
    if (value !== "") {
      setError(false);
    }
    setTodoValue(value);
  };

  const getTodos = async () => {
    let response = "";
    response = await axios.get("/todos");
    setTodos(response.data);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoValue !== "") {
      const todo = {
        title: todoValue,
      };

      // axios post request to backend
      axios
        .post("/add/todo", todo)
        .then(() => {
          getTodos();
        })
        .catch((err) => console.error(err));
    } else {
      setError(true);
      console.error("error");
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`/delete/todo/${id}`)
      .then(() => getTodos())
      .catch((err) => console.error(err));
  };

  return (
    <div className="container mt-5">
      {error ? <Error /> : null}
      <form className=" d-flex flex-row mb-3" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control me-3"
          placeholder="Todo"
          onChange={handleInputChange}
        />
        <input type="submit" value="Add Todo" className="btn btn-primary" />
      </form>

      <div className="mt-4 mb-2">
        {
          todosLength()
        }
      </div>

      <div>
        <ul className="list-group">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {todo.title}
              <div>
                <Link
                  to={{
                    pathname: "/edit",
                    state: todo._id,
                  }}
                >
                  <button className="btn btn-secondary">Edit</button>
                </Link>
                <button
                  className="btn btn-danger ms-3"
                  onClick={() => handleDelete(todo._id)}
                >
                  🗑
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoForm;
