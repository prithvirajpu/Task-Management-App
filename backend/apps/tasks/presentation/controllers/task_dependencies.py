from apps.tasks.application.use_cases.create_task import CreateTask
from apps.tasks.application.use_cases.get_task import GetTask
from apps.tasks.application.use_cases.list_tasks import ListTasks
from apps.tasks.application.use_cases.update_task import UpdateTask
from apps.tasks.application.use_cases.delete_task import DeleteTask
from apps.tasks.application.use_cases.complete_task import CompleteTask

from apps.tasks.infrastructure.repositories.django_task_repository import (
    DjangoTaskRepository,
)

class TaskDependencies:

    @staticmethod
    def create_task():
        return CreateTask(
            task_repository=DjangoTaskRepository()
        )

    @staticmethod
    def get_task():
        return GetTask(
            task_repository=DjangoTaskRepository()
        )

    @staticmethod
    def list_tasks():
        return ListTasks(
            task_repository=DjangoTaskRepository()
        )

    @staticmethod
    def update_task():
        return UpdateTask(
            task_repository=DjangoTaskRepository()
        )

    @staticmethod
    def delete_task():
        return DeleteTask(
            task_repository=DjangoTaskRepository()
        )

    @staticmethod
    def complete_task():
        return CompleteTask(
            task_repository=DjangoTaskRepository()
        )