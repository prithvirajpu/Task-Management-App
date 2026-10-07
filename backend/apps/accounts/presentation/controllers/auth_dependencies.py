from apps.accounts.application.use_cases.send_registration_otp import (
    SendRegistrationOTP,
)
from apps.accounts.application.use_cases.verify_registration_otp import (
    VerifyRegistrationOTP,
)
from apps.accounts.application.use_cases.complete_registration import (
    CompleteRegistration,
)
from apps.accounts.application.use_cases.login_with_password import (
    LoginWithPassword,
)
from apps.accounts.infrastructure.repositories.django_user_repository import (
    DjangoUserRepository,
)
from apps.accounts.infrastructure.repositories.django_otp_repository import (
    DjangoOTPRepository,
)
from apps.accounts.infrastructure.repositories.django_registration_verification_repository import (
    DjangoRegistrationVerificationRepository,
)
from apps.accounts.infrastructure.services.django_email_service import (
    DjangoEmailService,
)
from apps.accounts.infrastructure.services.django_jwt_token_service import (
    DjangoJWTTokenService,
)
from apps.accounts.application.use_cases.send_login_otp import (
    SendLoginOTP,
)
from apps.accounts.application.use_cases.verify_login_otp import (
    VerifyLoginOTP,
)


class AuthDependencies:

    @staticmethod
    def send_registration_otp():

        return SendRegistrationOTP(
            user_repository=DjangoUserRepository(),
            otp_repository=DjangoOTPRepository(),
            email_service=DjangoEmailService(),
        )

    @staticmethod
    def verify_registration_otp():

        return VerifyRegistrationOTP(
            otp_repository=DjangoOTPRepository(),
            verification_repository=(
                DjangoRegistrationVerificationRepository()
            ),
        )

    @staticmethod
    def complete_registration():

        return CompleteRegistration(
            user_repository=DjangoUserRepository(),
            verification_repository=(
                DjangoRegistrationVerificationRepository()
            ),
        )

    @staticmethod
    def login_with_password():

        return LoginWithPassword(
            user_repository=DjangoUserRepository(),
            token_service=DjangoJWTTokenService(),
        )
    
    @staticmethod
    def send_login_otp():

        return SendLoginOTP(
            user_repository=DjangoUserRepository(),
            otp_repository=DjangoOTPRepository(),
            email_service=DjangoEmailService(),
        )

    @staticmethod
    def verify_login_otp():

        return VerifyLoginOTP(
            user_repository=DjangoUserRepository(),
            otp_repository=DjangoOTPRepository(),
            token_service=DjangoJWTTokenService(),
        )