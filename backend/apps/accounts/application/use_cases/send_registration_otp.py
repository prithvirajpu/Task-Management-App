import secrets
from datetime import timedelta

from django.utils import timezone

class SendRegistrationOTP:

    def __init__(self,
        user_repository,
        otp_repository,
        email_service,):
        self.user_repository = user_repository
        self.otp_repository = otp_repository
        self.email_service = email_service

    def execute(self, email: str):
        email=email.strip().lower()
        if not email:
            raise ValueError('Email is required.')
        if self.user_repository.exists_by_email(email):
            raise ValueError('Email already exists')
        otp=f"{secrets.randbelow(1_000_000):06d}"
        otp_record={'email':email,
                    'otp':otp,
                    'purpose':'REGISTRATION',
                    'expires_at':timezone.now()+timedelta(minutes=5),}
        self.otp_repository.save(otp_record)
        self.email_service.send_otp(email,otp)
        return {
            'message':'Registration OTP sent successfully.'
        }