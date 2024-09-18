import {
  fetchTodo,
  addTask,
  deleteTask,
  updateTask,
} from "../features/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const Home = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "todo",
  });

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask(task));
    setTask({ title: "", description: "", status: "todo" });
  };

  return (
    <div className="bg-gray-100 min-h-screen max-w-4xl mx-auto p-8">
      {loading && <div className="text-center text-blue-500">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}

      <h1 className="text-4xl font-bold text-center mb-8">
        Task Management App
      </h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h3 className="text-2xl font-semibold mb-4">Add New Task</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="task"
              className="block text-md font-medium text-gray-700"
            >
              Task Name:
            </label>
            <input
              type="text"
              id="task"
              name="title"
              placeholder="Enter task name"
              value={task.title}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-md font-medium text-gray-700"
            >
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter task description"
              rows="4"
              value={task.description}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-md font-medium text-gray-700"
            >
              Task Status:
            </label>
            <select
              id="status"
              name="status"
              value={task.status}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Add Task
          </button>
        </form>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Tasks</h2>

        <ul className="space-y-4">
          {tasks &&
            tasks.map((task) => (
              <li
                key={task.id}
                className="bg-gray-100 p-4 rounded-lg shadow flex justify-between items-center"
              >
                <div>
                  <p className="font-bold text-lg">{task.title}</p>
                  <p className="text-gray-700">{task.description}</p>
                  <p className="text-sm text-gray-500">Status: {task.status}</p>
                </div>
                <div className="space-x-2">
                  <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition duration-200">
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-200"
                    onClick={() => dispatch(deleteTask(task.id))}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
