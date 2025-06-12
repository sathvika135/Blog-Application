from rest_framework import serializers
from .models import Blog
from django.contrib.auth.models import User

class BlogSerializer(serializers.ModelSerializer):
    author_email = serializers.ReadOnlyField(source='author.email')
    author = serializers.SerializerMethodField()
    class Meta:
        model = Blog
        fields = ['id', 'title', 'content', 'author','author_email', 'created_at']
        read_only_fields = ['author', 'created_at']
    def get_author(self, obj):
        return {
            'id': obj.author.id,
            'username': obj.author.username,
            'email': obj.author.email
        }

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
