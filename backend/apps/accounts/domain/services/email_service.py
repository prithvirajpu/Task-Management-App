from abc import ABC, abstractmethod


class EmailService(ABC):

    @abstractmethod
    def send_otp(self, email: str, otp: str):
        pass