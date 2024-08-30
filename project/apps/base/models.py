from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _


def validate_non_negative(value):
    if value < 0:
        raise ValueError(_('Баланс не может быть отрицательным.'))


class User(AbstractUser):
    username = models.CharField(max_length=256, null=True)
    email = models.EmailField(unique=True, null=True)
    login = models.CharField(max_length=256, null=True)
    avatar = models.ImageField(null=True, blank=True, upload_to='avatars', default="assets/img/icons/avatar.svg")
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


class Categories(models.Model):
    title = models.CharField(max_length=250, blank=True, null=True)
    cover = models.ImageField(upload_to='covers/categories', default='random.jpg', blank=True, null=True)
    tags = models.CharField(max_length=250, blank=True, null=True)
    width = models.CharField(max_length=250, blank=True, null=True)
    height = models.CharField(max_length=250, blank=True, null=True)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    DisplayFields = ['id', 'title', 'cover', 'created', 'updated', 'tags', 'width', 'height']
    SearchableFields = DisplayFields
    FilterFields = ['created', 'updated']

    class Meta:
        ordering = ['id', '-updated']
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.title


class Products(models.Model):
    title = models.CharField(max_length=250, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(
        decimal_places=2,
        max_digits=10,
        validators=[validate_non_negative],
        blank=True, null=True
    )
    cover = models.ImageField(upload_to='covers/products', default='random.jpg', blank=True, null=True)
    category = models.ForeignKey(Categories, on_delete=models.SET_NULL, blank=True, null=True)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    DisplayFields = ['id', 'title', 'description', 'price', 'cover', 'created', 'updated']
    SearchableFields = DisplayFields
    FilterFields = ['created', 'updated']

    class Meta:
        ordering = ['-id', '-updated']
        verbose_name = 'Product'
        verbose_name_plural = 'Products'

    def __str__(self):
        return self.title
