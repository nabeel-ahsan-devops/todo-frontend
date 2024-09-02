import { useState } from "react";
import editSVG from "../assets/edit.svg";
import deleteSVG from "../assets/delete.svg";
import doneSVG from "../assets/done.svg";
import cancelSVG from "../assets/cancel.svg";
import filledCircleSVG from "../assets/filledCircle.svg";
import unfilledCircleSVG from "../assets/unfilledCircle.svg";
import axios from "axios";

function Todo({ item, todos, setTodos }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(item?.title);

  const completeTodo = () => {
    const updatedTodo = {
      title,
      _id: item?._id,
      is_completed: !item?.is_completed,
    };

    axios
      .patch(
        `${process.env.REACT_APP_SERVER_URL}todo/${item?._id}`,
        updatedTodo
      )
      .then((response) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo?._id === item?._id
              ? { ...todo, is_completed: !todo.is_completed }
              : todo
          )
        );
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {});
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleInpuSubmit = () => {
    const updatedTodo = {
      title,
      _id: item?._id,
      is_completed: item?.is_completed,
    };

    axios
      .patch(
        `${process.env.REACT_APP_SERVER_URL}todo/${item?._id}`,
        updatedTodo
      )
      .then((response) => {
        alert("Updated Successfully");

        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo?._id === item?._id ? { ...todo, title } : todo
          )
        );
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {});

    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}todo/${item?._id}`)
      .then((response) => {
        alert("Delete Successfully");
        setTodos((prevTodos) =>
          prevTodos.filter((todo) => todo?._id !== item?._id)
        );
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {});
  };

  return (
    <li id={item?._id} className="todo_item">
      {editing ? (
        <>
          <form className="edit-form">
            <label htmlFor="edit-todo">
              <input
                type="text"
                name="edit-todo"
                id="edit-todo"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </label>
          </form>
          <div className="todo_items_right">
            <button onClick={handleCancel}>
              <img src={cancelSVG} alt={"doneIcon"} />
            </button>{" "}
            <button onClick={handleInpuSubmit}>
              <img src={doneSVG} alt={"doneIcon"} />
            </button>
          </div>
        </>
      ) : (
        <>
          <button className="todo_items_left" onClick={completeTodo}>
            {item.is_completed ? (
              <img src={filledCircleSVG} alt={"completedIcon"} />
            ) : (
              <img src={unfilledCircleSVG} alt={"incompletedIcon"} />
            )}

            <p
              style={
                item.is_completed ? { textDecoration: "line-through" } : {}
              }
            >
              {item?.title}
            </p>
          </button>

          <div className="todo_items_right">
            <button onClick={handleEdit}>
              <img src={editSVG} alt={"editIcon"} />
            </button>
            <button onClick={handleDelete}>
              <img src={deleteSVG} alt={"deleteIcon"} />
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default Todo;
