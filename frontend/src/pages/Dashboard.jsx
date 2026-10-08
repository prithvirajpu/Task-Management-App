import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getTasks,
    completeTask,
    deleteTask,
} from "../api/taskApi";

import { useAuth } from "../context/AuthContext";
import ConfirmModal from "../components/ConfirmModal";

function Dashboard() {
    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const fetchTasks = async () => {
        try {
            setError("");

            const response = await getTasks();

            setTasks(response.data);

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to load tasks."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleComplete = async (taskId) => {
        try {
            setError("");

            await completeTask(taskId);

            await fetchTasks();

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to complete task."
            );
        }
    };

    const handleDelete = async (taskId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");

            await deleteTask(taskId);

            await fetchTasks();

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to delete task."
            );
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Navigation Header */}
            <header className="bg-white border-b border-slate-200">
                <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                            Task Dashboard
                        </h1>
                        <p className="text-xs text-slate-500">
                            Welcome back, <span className="font-medium text-slate-700">{user?.name}</span>
                        </p>
                    </div>
                    <button
                        onClick={()=>setShowLogoutModal(true)}
                        className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
                    >
                        Logout
                    </button>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="max-w-5xl mx-auto px-4 py-8">
                {/* Actions & Section Title */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                        My Tasks
                    </h2>
                    <button
                        onClick={() => {
                            console.log("CREATE CLICKED");
                            console.log("Authenticated:", true);
                            navigate("/tasks/create");
                        }}
                        className="px-5 py-2.5 bg-[#FF5232] hover:bg-[#e04427] text-white font-medium text-sm rounded-xl transition-all shadow-sm active:scale-[0.99] flex items-center gap-2"
                    >
                        <span>+</span> Create Task
                    </button>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="mb-6 p-4 text-sm text-[#FF5232] bg-red-50 rounded-xl border border-red-100">
                        {error}
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-12">
                        <p className="text-sm font-medium text-slate-500">
                            Loading tasks...
                        </p>
                    </div>
                )}

                {/* Empty State */}
                {!loading && tasks.length === 0 && (
                    <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
                        <p className="text-slate-500 text-sm font-medium">
                            No tasks found.
                        </p>
                        <p className="text-slate-400 text-xs mt-1">
                            Click "Create Task" above to get started.
                        </p>
                    </div>
                )}

                {/* Task Grid / List */}
                {!loading && tasks.length > 0 && (
                    <div className="grid gap-4 md:grid-cols-2">
                        {tasks.map((task) => (
                            <div
                                key={task.id}
                                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <h3 className="text-base font-semibold text-slate-900">
                                            {task.title}
                                        </h3>
                                        <span
                                            className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                                                task.status === "COMPLETED"
                                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                                    : "bg-slate-100 text-slate-600"
                                            }`}
                                        >
                                            {task.status}
                                        </span>
                                    </div>

                                    {task.description && (
                                        <p className="text-sm text-slate-600 mb-3">
                                            {task.description}
                                        </p>
                                    )}

                                    {task.scheduled_at && (
                                        <p className="text-xs text-slate-400 mb-4">
                                            Scheduled:{" "}
                                            {new Date(
                                                task.scheduled_at
                                            ).toLocaleString()}
                                        </p>
                                    )}
                                </div>

                                {/* Task Action Buttons */}
                               {/* Task Action Buttons */}
<div className="flex items-center gap-2 pt-3 border-t border-slate-100 mt-2">

    <button
        onClick={() => handleComplete(task.id)}
        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
            task.status === "COMPLETED"
                ? "text-slate-600 bg-slate-100 hover:bg-slate-200"
                : "text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
        }`}
    >
        {task.status === "COMPLETED"
            ? "Mark Pending"
            : "Complete"}
    </button>

    <button
        onClick={() =>
            navigate(`/tasks/${task.id}/edit`)
        }
        className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all"
    >
        Edit
    </button>

    <button
        onClick={() => handleDelete(task.id)}
        className="px-3 py-1.5 text-xs font-medium text-[#FF5232] bg-red-50 hover:bg-red-100 rounded-lg transition-all ml-auto"
    >
        Delete
    </button>

</div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <ConfirmModal
    isOpen={showLogoutModal}
    title="Logout"
    message="Are you sure you want to logout?"
    onConfirm={handleLogout}
    onCancel={() => setShowLogoutModal(false)}
/>
        </div>
    );
}

export default Dashboard;