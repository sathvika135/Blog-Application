# blog/urls.py
from django.urls import path
from .views import BlogList, BlogDetail, BlogCreate, BlogEdit,BlogUpdateView
from .views import RegisterView
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView
from .views import BlogListCreateAPIView, BlogRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('api/blogs/', BlogList.as_view()),
    path('signup/', RegisterView.as_view()),
    path('api/blogs/<int:pk>/', BlogDetail.as_view()),
    path('api/blogs/create/', BlogCreate.as_view()),
    path('api/blogs/<int:pk>/', BlogUpdateView.as_view(), name='update-blog'),
    path('api/blogs/<int:pk>/edit/', BlogEdit.as_view()),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('blogs/', BlogListCreateAPIView.as_view(), name='blog-list-create'),
    path('blogs/<int:pk>/', BlogRetrieveUpdateDestroyAPIView.as_view(), name='blog-detail'),
]

