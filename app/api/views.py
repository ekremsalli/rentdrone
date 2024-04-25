from django.shortcuts import render
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from .models import UserProfile,Drone
from .serializers import UserProfileSerializer,DroneSerializer

class RegisterUserView(APIView):
    parser_classes = [JSONParser, MultiPartParser, FormParser]
    def post(self, request):

        # if email is already in use
        if UserProfile.objects.filter(email=request.data['email']).exists():
            return Response({'error': 'Email already registered'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer = UserProfileSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserView(APIView):
    permission_classes = (IsAuthenticated,)
    parser_classes = [JSONParser, MultiPartParser, FormParser]

    def get(self, request):
        serializer = UserProfileSerializer(request.user, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # update user profile image
    def put(self, request):
        user = UserProfile.objects.get(email=request.user.email)
        user.avatar = request.data['avatar']
        user.save()
        return Response({'message': 'Image updated'}, status=status.HTTP_200_OK)
    
class AllUsersView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        users = UserProfile.objects.all()
        serializer = UserProfileSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class DroneView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        drones = Drone.objects.all()
        serializer = DroneSerializer(drones, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = DroneSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class DroneEditView(APIView):
    permission_classes = (IsAuthenticated,)

    def put(self, request,pk):
        drone = Drone.objects.get(id=pk)
        drone.brand = request.data['brand']
        drone.model = request.data['model']
        drone.weight = request.data['weight']
        drone.category = request.data['category']
        drone.max_altitude = request.data['max_altitude']
        drone.power_source = request.data['power_source']
        drone.speed = request.data['speed']
        drone.departure = request.data['departure']
        drone.landing = request.data['landing']
        drone.length = request.data['length']
        drone.image = request.data['image']
        drone.price = request.data['price']
        drone.status = request.data['status']
        drone.save()
        return Response({'message': 'Drone features have been uptaded'}, status=status.HTTP_200_OK)
    
    def delete(self, request, pk):
        drone = Drone.objects.get(id=pk)
        drone.delete()
        return Response({'message': 'Drone has been deleted'}, status=status.HTTP_204_NO_CONTENT)
    
