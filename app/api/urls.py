from django.contrib import admin
from django.urls import path

from django.urls import path
from .views import RegisterUserView ,UserView, AllUsersView,DroneView,DroneEditView,RentedView,RentedEditView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('', AllUsersView.as_view()),
    path('user/', UserView.as_view()),
    path('register/', RegisterUserView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('drone/', DroneView.as_view(), name='drone_create_read'),
    path('filtered_drone/', DroneView.as_view(), name='drone_filtered'),
    path('drone/<pk>', DroneEditView.as_view(), name='drone_update_delete'),
    path('rented/', RentedView.as_view(), name='rented_create_read'),
    path('filtered_rented/', DroneView.as_view(), name='rented_filtered'),
    path('rented/<pk>', RentedEditView.as_view(), name='rented_update_delete'),
]
