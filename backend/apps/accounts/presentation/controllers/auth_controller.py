from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.accounts.application.use_cases.send_registration_otp import (
    SendRegistrationOTP,
)
from apps.accounts.infrastructure.repositories.django_user_repository import (
    DjangoUserRepository,
)
from apps.accounts.infrastructure.repositories.django_otp_repository import (
    DjangoOTPRepository,
)
from apps.accounts.infrastructure.services.django_email_service import (
    DjangoEmailService,
)
from apps.accounts.application.use_cases.verify_registration_otp import (
    VerifyRegistrationOTP,
)
from apps.accounts.infrastructure.repositories.django_registration_verification_repository import (
    DjangoRegistrationVerificationRepository,
)

class SendRegistrationOTPController(APIView):
    def post(self,request):
        email=request.data.get('email')
        use_case=SendRegistrationOTP(user_repository=DjangoUserRepository(),
                                     otp_repository=DjangoOTPRepository(),
                                     email_service=DjangoEmailService())
        try:
            result=use_case.execute(email)
            return Response(result,status=status.HTTP_200_OK)
        except ValueError as error:
            return Response({
                'error':str(error)},
                status=status.HTTP_400_BAD_REQUEST
            )

class VerifyRegistrationOTPController(APIView):

    def post(self, request):

        email = request.data.get("email")
        otp = request.data.get("otp")

        use_case = VerifyRegistrationOTP(
            otp_repository=DjangoOTPRepository(),
            verification_repository=(
                DjangoRegistrationVerificationRepository()
            ),
        )

        try:
            result = use_case.execute(
                email=email,
                otp=otp,
            )

            return Response(
                result,
                status=status.HTTP_200_OK,
            )

        except ValueError as error:

            return Response(
                {"error": str(error)},
                status=status.HTTP_400_BAD_REQUEST,
            )