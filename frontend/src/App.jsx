import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import TaskForm from './pages/TaskForm'
import Calender from './pages/Calender'

function App() {

    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>}/>
                <Route path="/tasks/create" element={<ProtectedRoute> <TaskForm /> </ProtectedRoute>}/>
                <Route path="/tasks/:taskId/edit" element={<ProtectedRoute> <TaskForm /> </ProtectedRoute>}/>
                <Route path="/calendar" element={<ProtectedRoute> <Calender /> </ProtectedRoute>}/>

            </Routes>

        </BrowserRouter>
    );
}

export default App;