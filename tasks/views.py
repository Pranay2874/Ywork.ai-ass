from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Task
from .serializers import TaskSerializer

class TaskListCreateView(APIView):
    def get(self, request):
        status_param = request.query_params.get('status', None)
        tasks = Task.objects.all()

        if status_param is not None:
            if status_param not in ['pending', 'in_progress', 'done']:
                return Response(
                    {"error": "Invalid status value"}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            tasks = tasks.filter(status=status_param)

        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TaskDetailView(APIView):
    def patch(self, request, pk):
        task = get_object_or_404(Task, pk=pk)
        serializer = TaskSerializer(task, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
