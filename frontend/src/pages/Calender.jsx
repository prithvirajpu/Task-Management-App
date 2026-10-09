import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import {
    format,
    parse,
    startOfWeek,
    getDay,
} from "date-fns";
import { enUS } from "date-fns/locale";

import { getTasks } from "../api/taskApi";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/calender.css";

const locales = {
    "en-US": enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

function Calendar() {
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState(new Date());

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchScheduledTasks = async () => {
            try {
                setError("");

                const response = await getTasks();
                const tasks = response.data;

                const calendarEvents = tasks
                    .filter((task) => task.scheduled_at)
                    .map((task) => {
                        const start = new Date(task.scheduled_at);

                        return {
                            id: task.id,
                            title: task.title,
                            start,
                            end: new Date(
                                start.getTime() + 30 * 60 * 1000
                            ),
                            status: task.status,
                        };
                    });

                setEvents(calendarEvents);
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Failed to load scheduled tasks."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchScheduledTasks();
    }, []);

    const handleSelectEvent = (event) => {
        navigate(`/tasks/${event.id}/edit`);
    };

    const eventStyleGetter = (event) => {
        const isCompleted = event.status === "COMPLETED";

        return {
            style: {
                backgroundColor: isCompleted
                    ? "#d1fae5"
                    : "#ffede8",
                color: isCompleted
                    ? "#047857"
                    : "#c2410c",
                border: isCompleted
                    ? "1px solid #a7f3d0"
                    : "1px solid #fed7cc",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: "500",
            },
        };
    };

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Header */}
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">

                    <div>
                        <h1 className="text-xl font-bold text-slate-900">
                            Task Calendar
                        </h1>

                        <p className="mt-1 text-xs text-slate-500">
                            View and manage your scheduled tasks.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </header>

            {/* Calendar Content */}
            <main className="mx-auto max-w-7xl px-4 py-8">

                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">
                            Scheduled Tasks
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Select a task to view or edit it.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">

                        <div className="flex items-center gap-2">
                            <span className="h-3 w-3 rounded-sm bg-orange-200" />
                            Pending
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="h-3 w-3 rounded-sm bg-emerald-200" />
                            Completed
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-600">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center">
                        <p className="text-sm text-slate-500">
                            Loading calendar...
                        </p>
                    </div>
                ) : (
                    <div className="calendar-container rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">

                        {events.length === 0 && (
                            <div className="mb-4 rounded-xl bg-slate-50 p-3 text-sm text-slate-500">
                                No scheduled tasks yet. Tasks with a scheduled date and time will appear here.
                            </div>
                        )}

                        <BigCalendar
    localizer={localizer}
    events={events}
    startAccessor="start"
    endAccessor="end"
    titleAccessor="title"
    views={["month"]}
    view="month"
    date={currentDate}
    onNavigate={(newDate) => setCurrentDate(newDate)}
    onSelectEvent={handleSelectEvent}
    eventPropGetter={eventStyleGetter}
    popup
    style={{ height: 650 }}
/>
                    </div>
                )}

                <div className="mt-5 flex justify-end">
                    <button
                        onClick={() => navigate("/tasks/create")}
                        className="rounded-xl bg-[#FF5232] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#e04427]"
                    >
                        + Create Task
                    </button>
                </div>
            </main>
        </div>
    );
}

export default Calendar;