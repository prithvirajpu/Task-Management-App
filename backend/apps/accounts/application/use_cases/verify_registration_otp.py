from django.utils import timezone


class VerifyRegistrationOTP:

    def __init__(
        self,
        otp_repository,
        verification_repository,
    ):
        self.otp_repository = otp_repository
        self.verification_repository = verification_repository

    def execute(self, email: str, otp: str):

        email = email.strip().lower()
        otp = otp.strip()

        if not email or not otp:
            raise ValueError("Email and OTP are required.")

        otp_record = self.otp_repository.get_valid_otp(
            email=email,
            purpose="REGISTRATION",
        )

        if not otp_record:
            raise ValueError("Invalid or expired OTP.")

        if otp_record.otp != otp:
            raise ValueError("Invalid OTP.")

        self.otp_repository.delete(otp_record)

        self.verification_repository.save({
            "email": email,
            "verified": True,
            "expires_at": timezone.now() + timezone.timedelta(minutes=10),
        })

        return {
            "message": "Email verified successfully."
        }