from django.shortcuts import render
from . import models

def main(request):
    categories = models.Categories.objects.all()

    context = {'categories': categories}
    return render(request, template_name='base/main.htm', context=context)
