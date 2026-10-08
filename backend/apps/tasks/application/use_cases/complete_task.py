class CompleteTask:

    def __init__(self, task_repository):
        self.task_repository = task_repository

    def execute(self, task_id: int, user):

        task = self.task_repository.get_by_id(
            task_id=task_id,
            user=user,
        )

        if not task:
            raise ValueError("Task not found.")

        if task.status == task.Status.COMPLETED:
            task.status = task.Status.PENDING
        else:
            task.status = task.Status.COMPLETED

        return self.task_repository.update(
            task,
            {"status": task.status}
        )