from apps.accounts.models import EmailOTP
from apps.accounts.domain.repositories.otp_repository import OTPRepository
from django.utils import timezone

class DjangoOTPRepository(OTPRepository):
    def save(self,otp_data:dict):
        return EmailOTP.objects.create(
            email=otp_data['email'],
            otp=otp_data['otp'],
            purpose=otp_data['purpose'],
            expires_at=otp_data['expires_at']
        )
    def get_valid_otp(self, email: str, purpose: str):
        return EmailOTP.objects.filter(
            email=email,
            purpose=purpose,
            expires_at__gt=timezone.now(),
        ).order_by("-created_at").first()

    def delete(self, otp):
        otp.delete() 