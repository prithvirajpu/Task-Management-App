class CreateTask:

    def __init__(self, task_repository):
        self.task_repository = task_repository

    def execute(self,user,title: str,
        description: str = "",scheduled_at=None,
    ):
        title = title.strip()
        description = description.strip()

        if not title:
            raise ValueError("Title is required.")

        task_data = {
            "user": user,
            "title": title,
            "description": description,
            "scheduled_at": scheduled_at,
        }

        return self.task_repository.create(task_data)