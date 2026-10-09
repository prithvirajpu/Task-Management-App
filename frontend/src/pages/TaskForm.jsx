import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    createTask,
    getTask,
    updateTask,
} from "../api/taskApi";

function TaskForm() {
    const navigate = useNavigate();
    const { taskId } = useParams();

    const isEditMode = Boolean(taskId);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [scheduledAt, setScheduledAt] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!isEditMode) {
            return;
        }

        const fetchTask = async () => {
            try {
                const response = await getTask(taskId);

                const task = response.data;

                setTitle(task.title);
                setDescription(task.description || "");

                if (task.scheduled_at) {
                    setScheduledAt(
                        task.scheduled_at.slice(0, 16)
                    );
                }
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Failed to load task."
                );
            }
        };

        fetchTask();
    }, [taskId, isEditMode]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setError("");
            setLoading(true);

            const taskData = {
                title,
                description,
                scheduled_at: scheduledAt
                    ? new Date(scheduledAt).toISOString()
                    : null,
            };

            if (isEditMode) {
                await updateTask(taskId, taskData);
            } else {
                await createTask(taskData);
            }

            navigate("/dashboard");

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                
                {/* Form Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                        {isEditMode ? "Edit Task" : "Create Task"}
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        {isEditMode 
                            ? "Update the details of your existing task." 
                            : "Add a new task to your schedule."}
                    </p>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="mb-6 p-3 text-sm text-[#FF5232] bg-red-50 rounded-lg border border-red-100 text-center">
                        {error}
                    </div>
                )}

                {/* Task Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Title Input */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            placeholder="Enter task title"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF5232] focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Description Textarea */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            Description
                        </label>
                        <textarea
                            rows={4}
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            placeholder="Enter task description"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF5232] focus:border-transparent transition-all resize-none"
                        />
                    </div>

                    {/* Scheduled Date Input */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            Scheduled Date & Time
                        </label>
                        <input
                            type="datetime-local"
                            value={scheduledAt}
                            onChange={(event) => setScheduledAt(event.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF5232] focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Actions */}
                    <div className="pt-2 flex items-center gap-3">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-3 px-4 bg-[#FF5232] hover:bg-[#e04427] text-white font-medium rounded-xl transition-all shadow-sm active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading
                                ? "Saving..."
                                : isEditMode
                                    ? "Update Task"
                                    : "Create Task"}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/dashboard")}
                            className="px-5 py-3 text-slate-600 bg-slate-100 hover:bg-slate-200 font-medium rounded-xl transition-all"
                        >
                            Cancel
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default TaskForm;