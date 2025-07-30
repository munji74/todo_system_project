'use client';

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    setLoading(true);
    const snapshot = await getDocs(collection(db, "todos"));
    const docs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTasks(docs);
    setLoading(false);
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    await addDoc(collection(db, "todos"), {
      title: newTask.trim(),
      isDone: false,
      timestamp: new Date(),
    });
    setNewTask("");
    fetchTasks();
  };

  const toggleDone = async (id, currentStatus) => {
    await updateDoc(doc(db, "todos", id), { isDone: !currentStatus });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "todos", id));
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-sky-100 text-gray-800 p-6 transition-all duration-300">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-10 text-center text-purple-700 drop-shadow-lg">
          ✅ Admin To-Do Panel
        </h1>

        {/* Task Input */}
        <div className="mb-10 flex flex-col sm:flex-row gap-4 items-center">
          <input
            className="border border-purple-300 p-3 rounded-xl w-full bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            placeholder="Add a task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            onClick={addTask}
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl font-medium shadow-md transform transition-all hover:scale-105 hover:shadow-lg"
          >
            Add
          </button>
        </div>

        {/* Task List */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-10 w-10 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : tasks.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No tasks found.</p>
        ) : (
          <div className="space-y-5">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between border border-gray-200 bg-white/70 backdrop-blur-md shadow hover:shadow-lg hover:scale-[1.01] transition-all duration-300 p-5 rounded-2xl"
              >
                <span
                  className={`text-lg font-medium ${
                    task.isDone ? "line-through text-gray-400" : "text-gray-800"
                  }`}
                >
                  {task.title}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleDone(task.id, task.isDone)}
                    className={`px-4 py-2 text-sm rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow ${
                      task.isDone
                        ? "bg-yellow-400 hover:bg-yellow-500 text-white"
                        : "bg-sky-500 hover:bg-sky-600 text-white"
                    }`}
                  >
                    {task.isDone ? "Undo" : "Complete"}
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-sm font-semibold rounded-xl shadow hover:scale-105 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <p className="mt-12 text-center text-sm text-gray-500">
          Crafted by <span className="text-purple-500 font-semibold">Munjwok James Alala</span>
        </p>
      </div>
    </main>
  );
}
