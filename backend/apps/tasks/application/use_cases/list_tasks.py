class ListTasks:
    
    def __init__(self,task_repository):
        self.task_repository=task_repository

    def execute(self,user):
        return self.task_repository.get_all_by_user(user)