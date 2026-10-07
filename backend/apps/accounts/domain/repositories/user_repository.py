from abc import ABC,abstractmethod

class UserRepository(ABC):
    
    @abstractmethod
    def exists_by_email(self,email: str)->bool:
        pass

    @abstractmethod
    def create(self,email:str,name:str,password:str,is_email_verified:bool):
        pass

    @abstractmethod
    def save(self,user):
        pass

    @abstractmethod
    def get_by_email(self, email: str):
        pass