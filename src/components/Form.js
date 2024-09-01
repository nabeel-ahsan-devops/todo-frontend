import { useState } from "react";
import addSVG from "../assets/add.svg";
import axios from "axios";

function Form({ setTodos }) {
  const [todo, setTodo] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3000/todo", {
        title: todo,
        is_completed: false,
      })
      .then((response) => {
        console.log(response);
        alert("Successfully Saved");

        const newTodo = {
          title: response?.data?.title,
          is_completed: response?.data?.is_completed,
          _id: response?.data?._id,
        };

        // Update todo state
        setTodos((prevTodos) => [...prevTodos, newTodo]);
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {});

    // Reset todo
    setTodo("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="todo">
        <input
          type="text"
          name="todo"
          id="todo"
          value={todo}
          onChange={(event) => setTodo(event.target.value)}
          placeholder="Write your next task"
        />
      </label>

      <button>
        <img src={addSVG} alt="AddIcon" />
      </button>
    </form>
  );
}

export default Form;
