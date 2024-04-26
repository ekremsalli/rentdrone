from django.shortcuts import render
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from .models import UserProfile,Drone,Rented
from .serializers import UserProfileSerializer,DroneSerializer,RentedSerializer

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
    
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import RentedSerializer  # Assuming this is your serializer class
from .models import Drone  # Assuming this is your model class

class DroneFilteredView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        brand = request.query_params.get('brand', None)
        model = request.query_params.get('model', None)
        weight = request.query_params.get('weight', None)
        category = request.query_params.get('category', None)
        max_altitude = request.query_params.get('max_altitude', None)
        power_source = request.query_params.get('power_source', None)
        speed = request.query_params.get('speed', None)
        departure = request.query_params.get('departure', None)
        landing = request.query_params.get('landing', None)
        length = request.query_params.get('length', None)
        image = request.query_params.get('image', None)
        price = request.query_params.get('price', None)
        status = request.query_params.get('status', None)

        queryset = Drone.objects.all()

        # Filter based on provided query parameters
        if brand:
            queryset = queryset.filter(brand=brand)
        if model:
            queryset = queryset.filter(model=model)
        if weight:
            queryset = queryset.filter(weight=weight)  # Assuming weight is a FloatField
        if category:
            queryset = queryset.filter(category=category)
        if max_altitude:
            queryset = queryset.filter(max_altitude=max_altitude)  # Assuming max_altitude is a FloatField
        if power_source:
            queryset = queryset.filter(power_source=power_source)
        if speed:
            queryset = queryset.filter(speed=speed)  # Assuming speed is a FloatField
        if departure:
            queryset = queryset.filter(departure=departure)
        if landing:
            queryset = queryset.filter(landing=landing)
        if length:
            queryset = queryset.filter(length=length)  # Assuming length is a FloatField
        if image:
            queryset = queryset.filter(image=image)
        if price:
            queryset = queryset.filter(price=price)  # Assuming price is a DecimalField
        if status:
            queryset = queryset.filter(status=status)

        serializer = RentedSerializer(queryset, many=True)

        return Response(serializer.data)



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

class RentedView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        rented = Rented.objects.all()
        serializer = RentedSerializer(rented, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = RentedSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class RentedEditView(APIView):
    permission_classes = (IsAuthenticated,)

    def put(self, request,pk):
        rented = Rented.objects.get(id=pk)
        rented.start_date = request.data['start_date']
        rented.end_date = request.data['end_date']
        rented.save()
        return Response({'message': 'Rental features have been uptaded'}, status=status.HTTP_200_OK)
    
    def delete(self, request, pk):
        rented = Rented.objects.get(id=pk)
        rented.delete()
        return Response({'message': 'Rental information has been deleted'}, status=status.HTTP_200_OK)


class RentedFilteredView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        start_date = request.query_params.get('start_date', None)
        end_date = request.query_params.get('end_date', None)
        user_id = request.query_params.get('user_id', None)
        drone_id = request.query_params.get('drone_id', None)

        queryset = Rented.objects.all()

        if start_date:
            queryset = queryset.filter(start_date=start_date)
        if end_date:
            queryset = queryset.filter(end_date=end_date)
        if user_id:
            queryset = queryset.filter(user_id=user_id)
        if drone_id:
            queryset = queryset.filter(drone_id=drone_id)

        serializer = RentedSerializer(queryset, many=True)
        return Response(serializer.data)
