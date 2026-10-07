from abc import ABC,abstractclassmethod

class UserRepository(ABC):
    
    @abstractclassmethod
    def exists_by_email(self,email: str)->bool:
        pass

    @abstractclassmethod
    def create(self,email:str,name:str,password:str,is_email_verified:bool):
        pass

    @abstractclassmethod
    def save(self,user):
        pass
