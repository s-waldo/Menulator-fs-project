from rest_framework import serializers
from .models import Recipe, RecipeIngredient, Ingredient


class Recipe(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=255)
    steps = serializers.CharField()
    image = serializers.CharField(max_length=2048)
    video = serializers.CharField(max_length=2048)
    ingredients = serializers.StringRelatedField(many=True)

    class Meta:
        model = Ingredient
        fields = ["name"]

