from django.urls import path
from . import views

app_name = 'kowordle'
urlpatterns = [
    path('', views.kowordle, name='kowordle'),
]
