import json
from django.http import JsonResponse
from .models import Recipe, Ingredient, RecipeIngredient
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from .serializers import Recipe as RecipeSerializer
from rest_framework.response import Response


# Create your views here.
def getAllRecipesAndIngredients(request):
    recipes = Recipe.objects.all()
    recipe_arr = []
    for recipe in recipes:
        ingredient_arr = []
        for ingredient in recipe.ingredients.all():
            ingredient_amt = RecipeIngredient.objects.get(
                ingredient=ingredient, recipe=recipe
            )
            ingredient_arr.append(
                {"ingredient": ingredient.name, "amount": ingredient_amt.quantity}
            )
        recipe_arr.append(
            {
                "id": recipe.id,
                "name": recipe.name,
                "steps": recipe.steps,
                "image": recipe.image,
                "video": recipe.video,
                "ingredients": ingredient_arr,
            }
        )
    return JsonResponse(recipe_arr, safe=False)


@csrf_exempt
def getAllRecipes(request):
    if request.method == "GET":
        recipes = Recipe.objects.values()
        return JsonResponse(list(recipes), safe=False)
    else:
        print(json.loads(request.body))
        return JsonResponse({"message": "Post Request"})


class RecipeList(APIView):
    def get(self, request, format=None):
        recipes = Recipe.objects.all()
        serializer = RecipeSerializer(recipes, many=True)
        return Response(serializer.data)
