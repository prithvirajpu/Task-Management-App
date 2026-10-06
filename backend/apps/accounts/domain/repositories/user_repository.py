from abc import ABC,abstractclassmethod

class UserRepository(ABC):
    
    @abstractclassmethod
    def exists_by_email(self,email: str)->bool:
        pass

    @abstractclassmethod
    def save(self,user):
        pass
