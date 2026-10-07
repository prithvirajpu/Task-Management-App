from django.urls import path

from apps.accounts.presentation.controllers.auth_controller import (
    SendRegistrationOTPController,LoginWithPasswordController,
    VerifyRegistrationOTPController,SendLoginOTPController,
    CompleteRegistrationController,VerifyLoginOTPController,
)


urlpatterns = [
    path("register/send-otp/",SendRegistrationOTPController.as_view(),name="register-send-otp",),
    path("register/verify-otp/",VerifyRegistrationOTPController.as_view(),name="register-verify-otp",),
    path("register/complete/",CompleteRegistrationController.as_view(),name="register-complete",),
    path("login/",LoginWithPasswordController.as_view(),name="login",),
    path("login/send-otp/",SendLoginOTPController.as_view(),name="login-send-otp",),
    path("login/verify-otp/",VerifyLoginOTPController.as_view(),name="login-verify-otp",),
]
