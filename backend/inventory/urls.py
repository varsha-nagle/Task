from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import item_list, item_detail


urlpatterns = [
    path('items/', item_list, name='item-list'),
    path('items/<int:pk>/', item_detail, name='item-detail'),
]