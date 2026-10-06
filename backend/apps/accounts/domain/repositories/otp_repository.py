from abc import ABC, abstractmethod

class OTPRepository(ABC):
    
    @abstractmethod
    def save(self,otp):
        pass

    @abstractmethod
    def get_valid_otp(self, email: str, purpose: str):
        pass

    @abstractmethod
    def delete(self, otp):
        pass