import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";

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
      <div className=" flex justify-center ">
        <div className="bg-orange-200 mt-4 p-5 font-serif w-[100vw] md:w-[75vw] rounded-xl min-h-[80vh]">
          <div className="flex gap-2 my-4 flex-col ">
            <span className="font-bold font-serif text-2xl">Add a Todo</span>
            <div className="flex items-center">
              <input
                value={todo}
                onChange={handleChange}
                className="w-80 h-8"
                type="text"
              />
              <button
                onClick={handleAdd}
                disabled={todo.length < 3}
                className="rounded-lg bg-orange-700 disabled:bg-orange-300 sabled:bg text-white text-xl mx-2  p-2"
              >
                <FaSave />
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
                    <div className=" md:w-[90%]">
                      <input
                        name={item.id}
                        onChange={(e) => {
                          handleCheckbox(e);
                        }}
                        type="checkbox"
                        checked={item.isCompleted}
                      />

                      <div className={item.isCompleted ? "line-through my-1 w-[110%] md:w-[100%]" : " my-1 w-[110%] md:w-[100%]"}>
                        {item.todo}
                      </div>
                    </div>
                    <div className="button self-baseline  top-0 w-[10%] flex justify-end items-start">
                      <button
                        onClick={() => {
                          handleEdit(item.id);
                        }}
                        className="rounded-lg bg-orange-700 text-white text-xl p-1 px-2  m-1  hover:bg-orange-800"
                      >
                        <FaRegEdit />
                      </button>
                      <button
                        onClick={() => {
                          handleDelete(item.id);
                        }}
                        className="rounded-lg bg-orange-700 text-white text-xl p-1 px-2 m-1 hover:bg-orange-800"
                      >
                        <MdDelete />
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



