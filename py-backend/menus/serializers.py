from rest_framework import serializers
from menus.models import Menu, UserMenu


class MenuSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    menu_arr_of_recipe_ids = serializers.CharField(
        required=True, allow_blank=False, max_length=2048
    )

    def create(self, validated_data):
        return Menu.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.menu_arr_of_recipe_ids = validated_data.get(
            "menu_arr_of_recipe_ids", instance.menu_arr_of_recipe_ids
        )
        instance.save()
        return instance
