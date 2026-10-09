import secrets
from datetime import timedelta

from django.utils import timezone


class SendLoginOTP:

    def __init__(
        self,
        user_repository,
        otp_repository,
        email_service,
    ):
        self.user_repository = user_repository
        self.otp_repository = otp_repository
        self.email_service = email_service

    def execute(self, email: str):

        email = email.strip().lower()

        if not email:
            raise ValueError("Email is required.")

        user = self.user_repository.get_by_email(email)

        if not user:
            raise ValueError("Invalid email.")

        if not user.is_email_verified:
            raise ValueError("Email is not verified.")

        otp = f"{secrets.randbelow(1_000_000):06d}"

        otp_data = {
            "email": email,
            "otp": otp,
            "purpose": "LOGIN",
            "expires_at": timezone.now() + timedelta(minutes=5),
        }

        self.otp_repository.save(otp_data)

        self.email_service.send_otp(
            email,
            otp,
        )

        return {
            "message": "Login OTP sent successfully."
        }