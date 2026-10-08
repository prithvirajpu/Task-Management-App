class DeleteTask:

    def __init__(self, task_repository):
        self.task_repository = task_repository

    def execute(self, task_id: int, user):

        task = self.task_repository.get_by_id(
            task_id=task_id,
            user=user,
        )

        if not task:
            raise ValueError("Task not found.")

        self.task_repository.delete(task)

        return {
            "message": "Task deleted successfully."
        }