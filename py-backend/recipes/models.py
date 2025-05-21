from django.db import models

# Create your models here.


class Ingredient(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Recipe(models.Model):
    name = models.CharField(max_length=255)
    steps = models.TextField()
    image = models.CharField(max_length=2048, blank=True)
    video = models.CharField(max_length=2048, blank=True)
    ingredients = models.ManyToManyField(Ingredient, through='RecipeIngredient')

    def __str__(self):
        return self.name


class RecipeIngredient(models.Model):
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    quantity = models.CharField(max_length=255)

    def __str__(self):
        return "{}_{}".format(self.recipe.__str__(), self.ingredient.__str__())
