from apps.accounts.models import User
from apps.accounts.domain.repositories.user_repository import UserRepository

class DjangoUserRepository(UserRepository):
    def exists_by_email(self, email:str)-> bool:
        return User.objects.filter(email=email).first()
    def save(self,user):
        return user.save()