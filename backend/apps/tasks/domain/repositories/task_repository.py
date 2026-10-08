from abc import ABC, abstractmethod


class TaskRepository(ABC):

    @abstractmethod
    def create(self, task_data: dict):
        pass

    @abstractmethod
    def get_by_id(self, task_id: int, user):
        pass

    @abstractmethod
    def get_all_by_user(self, user):
        pass

    @abstractmethod
    def update(self, task, task_data: dict):
        pass

    @abstractmethod
    def delete(self, task):
        pass