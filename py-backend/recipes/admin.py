from django.contrib import admin

from .models import Recipe, Ingredient, RecipeIngredient


class IngredientInline(admin.TabularInline):
    model = RecipeIngredient
    extra = 0
    


class RecipeAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {"fields": ["name"]}),
        (
            "Steps",
            {
                "fields": ["steps"],
                "description": "Include all steps for the recipe.  Separate each step with a '|' symbol.",
            },
        ),
        ("Links", {"fields": ["image", "video"]}),
    ]
    inlines = [IngredientInline]
    list_display = ["name", "image", "video"]


# Register your models here.
admin.site.register(Recipe, RecipeAdmin)
admin.site.register(Ingredient)
admin.site.register(RecipeIngredient)
