class UpdateTask:

    def __init__(self, task_repository):
        self.task_repository = task_repository

    def execute(
        self,
        task_id: int,
        user,
        task_data: dict,
    ):

        task = self.task_repository.get_by_id(
            task_id=task_id,
            user=user,
        )

        if not task:
            raise ValueError("Task not found.")

        if "title" in task_data:

            title = task_data["title"].strip()

            if not title:
                raise ValueError("Title is required.")

            task_data["title"] = title

        if "description" in task_data:
            task_data["description"] = (
                task_data["description"].strip()
            )

        return self.task_repository.update(
            task,
            task_data,
        )