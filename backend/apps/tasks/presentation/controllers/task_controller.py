from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from apps.tasks.presentation.controllers.task_dependencies import (
    TaskDependencies,
)
from apps.common.presentation.presenters.response import (
    success_response,
    error_response,
)

class CreateTaskController(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        title = request.data.get("title")
        description = request.data.get("description", "")
        scheduled_at = request.data.get("scheduled_at")

        use_case = TaskDependencies.create_task()

        try:
            task = use_case.execute(
                user=request.user,
                title=title,
                description=description,
                scheduled_at=scheduled_at,
            )

            return success_response(
                message="Task created successfully.",
                data={
                    "id": task.id,
                    "title": task.title,
                    "description": task.description,
                    "scheduled_at": task.scheduled_at,
                    "status": task.status,
                },
                status_code=status.HTTP_201_CREATED,
            )
        except ValueError as error:
            return error_response(
                message=str(error)
            )

class ListTasksController(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        use_case = TaskDependencies.list_tasks()
        try:
            tasks = use_case.execute(user=request.user)

            data = [
                {
                    "id": task.id,
                    "title": task.title,
                    "description": task.description,
                    "scheduled_at": task.scheduled_at,
                    "status": task.status,
                }
                for task in tasks
            ]
            
            return success_response(
                message="Tasks retrieved successfully.",
                data=data,
            )
        except ValueError as error:
            return error_response(
                message=str(error)
                )
            
class GetTaskController(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, task_id):
        use_case = TaskDependencies.get_task()
        try:
            task = use_case.execute(
                task_id=task_id,
                user=request.user,
            )
            return success_response(
                message="Task retrieved successfully.",
                data={
                    "id": task.id,
                    "title": task.title,
                    "description": task.description,
                    "scheduled_at": task.scheduled_at,
                    "status": task.status,
                },
            )
        except ValueError as error:
            return error_response(
                message=str(error),
                status_code=status.HTTP_404_NOT_FOUND,
            )
            
class UpdateTaskController(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, task_id):

        task_data = {}

        if "title" in request.data:
            task_data["title"] = request.data.get("title")

        if "description" in request.data:
            task_data["description"] = request.data.get(
                "description"
            )

        if "scheduled_at" in request.data:
            task_data["scheduled_at"] = request.data.get(
                "scheduled_at"
            )
        use_case = TaskDependencies.update_task()
        try:
            task = use_case.execute(
                task_id=task_id,
                user=request.user,
                task_data=task_data,
            )
            return success_response(
                message="Task updated successfully.",
                data={
                    "id": task.id,
                    "title": task.title,
                    "description": task.description,
                    "scheduled_at": task.scheduled_at,
                    "status": task.status,
                },
            )
        except ValueError as error:
            return error_response(
                message=str(error),
                status_code=status.HTTP_404_NOT_FOUND,
            )
            
class DeleteTaskController(APIView):
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, task_id):
        
        use_case = TaskDependencies.delete_task()
        try:
            result = use_case.execute(
                task_id=task_id,
                user=request.user,
            )
            return success_response(
                message=result["message"]
            )
        except ValueError as error:
            return error_response(
                message=str(error),
                status_code=status.HTTP_404_NOT_FOUND,
            )
            
class CompleteTaskController(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, task_id):
        
        use_case = TaskDependencies.complete_task()
        try:
            task = use_case.execute(
                task_id=task_id,
                user=request.user,
            )
            return success_response(
                message="Task completed successfully.",
                data={
                    "id": task.id,
                    "title": task.title,
                    "description": task.description,
                    "scheduled_at": task.scheduled_at,
                    "status": task.status,
                },
            )
        except ValueError as error:
            return error_response(
                message=str(error)
            )