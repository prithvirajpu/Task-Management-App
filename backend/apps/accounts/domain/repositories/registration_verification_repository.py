from abc import ABC, abstractmethod


class RegistrationVerificationRepository(ABC):

    @abstractmethod
    def save(self, verification_data: dict):
        pass

    @abstractmethod
    def get_valid(self, email: str):
        pass

    @abstractmethod
    def mark_verified(self, verification):
        pass

    @abstractmethod
    def delete(self, verification):
        pass