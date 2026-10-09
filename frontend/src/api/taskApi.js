import api from "./axios";

export const createTask = async (taskData) => {
    try {
        const response = await api.post("/tasks/create/", taskData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getTasks = async () => {
    try {
        const response = await api.get("/tasks/");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getTask = async (taskId) => {
    try {
        const response = await api.get(`/tasks/${taskId}/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateTask = async (taskId, taskData) => {
    try {
        const response = await api.patch(
            `/tasks/${taskId}/update/`,
            taskData
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteTask = async (taskId) => {
    try {
        const response = await api.delete(
            `/tasks/${taskId}/delete/`
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const completeTask = async (taskId) => {
    try {
        const response = await api.post(
            `/tasks/${taskId}/complete/`
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};