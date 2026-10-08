from apps.tasks.domain.repositories.task_repository import TaskRepository
from apps.tasks.models import Task

class DjangoTaskRepository(TaskRepository):

    def create(self, task_data: dict):
        return Task.objects.create(
            **task_data
        )

    def get_by_id(self, task_id: int, user):
        return Task.objects.filter(
            id=task_id,
            user=user,
        ).first()

    def get_all_by_user(self, user):
        return Task.objects.filter(
            user=user
        ).order_by("-created_at")

    def update(self, task, task_data: dict):
        for field, value in task_data.items():
            setattr(task, field, value)

        task.save()
        return task

    def delete(self, task):
        task.delete()