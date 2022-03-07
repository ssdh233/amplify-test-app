import logo from "./logo.svg";
import "./App.css";
import { DataStore } from "@aws-amplify/datastore";
import { Todo } from "./models";
import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState(null);

  async function queryTodos() {
    const models = await DataStore.query(Todo);
    setTodos(models);
    console.log(models);
  }

  useEffect(() => {
    queryTodos();
  }, []);

  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = async () => {
    await DataStore.save(
      new Todo({
        name: newTodo,
        description: "No description",
      })
    );
    await queryTodos();
    setNewTodo("");
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React Test
        </a>
      </header>
      <div style={{ height: "100vh" }}>
        <h3>TODO list</h3>
        <input
          type="text"
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
        ></input>
        <button onClick={handleAddTodo}>Add</button>
        {todos?.map((todo) => (
          <label key={todo.text} style={{ display: "block" }}>
            <input
              type="checkbox"
              checked={todo.checked}
              onChange={() => {}}
            ></input>
            {todo.name}
            <button
              onClick={async () => {
                const modelToDelete = await DataStore.query(Todo, todo.id);
                DataStore.delete(modelToDelete);
                queryTodos();
              }}
            >
              Remove
            </button>
          </label>
        ))}
      </div>
    </div>
  );
}

export default App;
