from . import views
from django.urls import path

app_name = "search"

urlpatterns = [
    path("search", views.search, name="search"),
    path("find_similar", views.find_similar, name="find_similar"),
    path("ask", views.askGPT, name="ask"),
]