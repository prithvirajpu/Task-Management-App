from django.urls import path

from apps.tasks.presentation.controllers.task_controller import(
    CreateTaskController,ListTasksController,GetTaskController,
    UpdateTaskController,DeleteTaskController,CompleteTaskController,
)

urlpatterns = [
    path('',ListTasksController.as_view(),name='task-list'),
    path('create/',CreateTaskController.as_view(),name='task-create'),
    path('<int:task_id>/',GetTaskController.as_view(),name='task-detail'),
    path('<int:task_id>/update/',UpdateTaskController.as_view(),name='task-update'),
    path('<int:task_id>/delete/',DeleteTaskController.as_view(),name='task-delete'),
    path('<int:task_id>/complete/',CompleteTaskController.as_view(),name='task-complete'),
    
]