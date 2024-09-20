import { fetchTodo } from "../features/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AddTask from "./AddTask";
import EditTask from "./EditTask";

export const Home = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  return (
    <div className="bg-gray-100 min-h-screen max-w-4xl mx-auto p-8">
      {loading && <div className="text-center text-blue-500">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}

      <h1 className="text-4xl font-bold text-center mb-8">
        Task Management App
      </h1>
      <AddTask />
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
                  <EditTask updatedTask={task} />
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
