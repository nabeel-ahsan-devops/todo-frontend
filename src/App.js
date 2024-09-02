import React from "react";
import "./App.css";
import Header from "./components/Header";
import TodoHero from "./components/TodoHero";
import Form from "./components/Form";
import TODOList from "./components/TodoList";
import axios from "axios";

function App() {
  const [todos, setTodos] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}todo`)
      .then((response) => {
        console.log(response);
        setTodos(response?.data);
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {});
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <TodoHero todos={todos} />
      <Form todos={todos} setTodos={setTodos} />
      <TODOList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
