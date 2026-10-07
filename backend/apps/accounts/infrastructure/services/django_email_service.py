from django.core.mail import send_mail
from django.conf import settings
from apps.accounts.domain.services.email_service import EmailService

class DjangoEmailService(EmailService):
    def send_otp(self, email:str, otp:str):
        send_mail(
            subject="Your Task Management App OTP",
            message=(
                f"Your OTP is {otp}.\n\n"
                "This OTP is valid for 5 minutes."
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[email],
        )