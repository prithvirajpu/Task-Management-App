from django.urls import path

from apps.accounts.presentation.controllers.auth_controller import (
    SendRegistrationOTPController,
    VerifyRegistrationOTPController,
    CompleteRegistrationController,
)


urlpatterns = [
    path("register/send-otp/",SendRegistrationOTPController.as_view(),name="register-send-otp",),
    path("register/verify-otp/",VerifyRegistrationOTPController.as_view(),name="register-verify-otp",),
    path("register/complete/",CompleteRegistrationController.as_view(),name="register-complete",),
]
