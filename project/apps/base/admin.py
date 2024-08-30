from django.contrib import admin
from . import models


@admin.register(models.User)
class UserAdmin(admin.ModelAdmin):
    list_display = models.User.DisplayFields
    search_fields = models.User.SearchableFields
    list_filter = models.User.FilterFields


@admin.register(models.Categories)
class CategoriesAdmin(admin.ModelAdmin):
    list_display = models.Categories.DisplayFields
    search_fields = models.Categories.SearchableFields
    list_filter = models.Categories.FilterFields


@admin.register(models.Products)
class ProductsAdmin(admin.ModelAdmin):
    list_display = models.Products.DisplayFields
    search_fields = models.Products.SearchableFields
    list_filter = models.Products.FilterFields
