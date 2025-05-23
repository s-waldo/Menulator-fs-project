from django.urls import path

from . import views

urlpatterns = [
  path('', views.getAllRecipes, name="index"),
  path("all/", views.RecipeList.as_view())
]