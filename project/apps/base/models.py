from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    username = models.CharField(max_length=256, null=True)
    email = models.EmailField(unique=True, null=True)
    login = models.CharField(max_length=256, null=True)
    avatar = models.ImageField(null=True, blank=True, upload_to='avatars', default="avatar.svg")
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    DisplayFields = ['username', 'login', 'email', 'avatar', 'created', 'updated', 'id']
    SearchableFields = ['id', 'username', 'login', 'email', 'avatar', 'created', 'updated']
    FilterFields = ['created', 'updated']

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    class Meta:
        ordering = ['-id', '-updated']
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return self.username or self.email
