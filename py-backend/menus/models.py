from django.db import models
from recipes.models import Recipe
from users.models import CustomUser


# Create your models here.
class Menu(models.Model):
    menu_arr_of_recipe_ids = models.CharField(max_length=2048)

    class Meta:
        ordering = ["id"]



class UserMenu(models.Model):
    user_id = models.ManyToManyField(CustomUser)
    menu_id = models.ManyToManyField(Menu)
    creation_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['creation_date']