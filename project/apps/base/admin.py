from django.contrib import admin
from . import models

@admin.register(models.User)
class UserAdmin(admin.ModelAdmin):
    list_display = models.User.DisplayFields
    search_fields = models.User.SearchableFields
    list_filter = models.User.FilterFields
