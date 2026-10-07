from apps.accounts.models import User
from apps.accounts.domain.repositories.user_repository import UserRepository

class DjangoUserRepository(UserRepository):
    def exists_by_email(self, email:str)-> bool:
        return User.objects.filter(email=email).first()
    
    def create(self,email:str,name:str,password:str,is_email_verified:bool):
        return User.objects.create_user(
            email=email,name=name,password=password,
            is_email_verified=is_email_verified
        )
    def get_by_email(self,email:str):
        return User.objects.filter(email=email).first()
    
    def save(self,user):
        return user.save()