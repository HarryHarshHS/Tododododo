import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(false);

  useEffect(() => {
    let Todolength = localStorage.getItem("todos3");
    if (Todolength) {
      let Todos = JSON.parse(localStorage.getItem("todos3"));
      setTodos(Todos);
    }
  }, []);

  const saveToLS = (todos) => {
    localStorage.setItem("todos3", JSON.stringify(todos));
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleDelete = (id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const handleEdit = (id) => {
    let t = todos.filter((i) => {
      return i.id === id;
    });
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const handleAdd = () => {
    if (todo.trim()) {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
      saveToLS([...todos, { id: uuidv4(), todo, isCompleted: false }]);
      setTodo("");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container p-10">
        <div className="bg-orange-200  p-5 font-serif rounded-xl min-h-[80vh]">
          <div className="flex gap-2 my-4 flex-col ">
            <span className="font-bold font-serif text-2xl">Add a Todo</span>
            <div>
              <input
                value={todo}
                onChange={handleChange}
                className="w-80"
                type="text"
              />
              <button
                onClick={handleAdd}
                disabled={todo.length < 3}
                className="rounded-lg bg-orange-700 disabled:bg-orange-300 sabled:bg text-white text-sm mx-2 p-1"
              >
                ADD
              </button>
            </div>
          </div>
          <input
            type="checkbox"
            onChange={toggleFinished}
            checked={showFinished}
          />{" "}
          Show Finished
          <div className="font-bold text-lg font-serif flex justify-between">
            <span>Your TODOs</span>
          </div>
          <div className="todos">
            {todos.length == 0 && <div>No todo to display</div>}
            {todos.map((item) => {
              return (
                (showFinished || !item.isCompleted) && (
                  <div
                    key={item.id}
                    className="todo flex  items-center  border-2 border-orange-300 p-4 justify-between"
                  >
                    <div>
                      <input
                        name={item.id}
                        onChange={(e) => {
                          handleCheckbox(e);
                        }}
                        type="checkbox"
                        checked={item.isCompleted}
                      />

                      <div className={item.isCompleted ? "line-through" : ""}>
                        {item.todo}
                      </div>
                    </div>
                    <div className="button">
                      <button
                        onClick={() => {
                          handleEdit(item.id);
                        }}
                        className="rounded-lg bg-orange-700 text-white text-xs p-1 m-1 hover:bg-orange-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          handleDelete(item.id);
                        }}
                        className="rounded-lg bg-orange-700 text-white text-xs p-1 m-1 hover:bg-orange-800"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
