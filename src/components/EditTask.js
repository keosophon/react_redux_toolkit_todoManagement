import React from "react";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../features/taskSlice";
import { useState } from "react";

const EditTask = ({ updatedTask }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = React.useState(false);

  const [task, setTask] = useState({
    id: updatedTask.id,
    title: updatedTask.title,
    description: updatedTask.description,
    status: updatedTask.status,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTask(task));
    setIsEditing(false);
  };

  return (
    <div className="relative">
      {isEditing ? (
        <form
          className="space-y-6 bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto border border-gray-200"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="task"
              className="block text-lg font-semibold text-gray-700"
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
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-lg font-semibold text-gray-700"
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
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-lg font-semibold text-gray-700"
            >
              Task Status:
            </label>
            <select
              id="status"
              name="status"
              value={task.status}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              Update Task
            </button>
            <button
              type="button"
              className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="space-x-2">
            <button
              className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 transition duration-200"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-200"
              onClick={() => dispatch(deleteTask(task.id))}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EditTask;
