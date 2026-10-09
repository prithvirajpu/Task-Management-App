from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from apps.accounts.presentation.controllers.auth_dependencies import AuthDependencies
from apps.common.presentation.presenters.response import success_response,error_response

class SendRegistrationOTPController(APIView):
    def post(self,request):
        email=request.data.get('email')
        use_case=AuthDependencies.send_registration_otp()
        try:
            result=use_case.execute(email)
            return success_response(message=result['message'])
        except ValueError as error:
            return error_response(message=str(error))

class VerifyRegistrationOTPController(APIView):

    def post(self, request):

        email = request.data.get("email")
        otp = request.data.get("otp")

        use_case = AuthDependencies.verify_registration_otp()
        try:
            result = use_case.execute(
                email=email,otp=otp)

            return success_response(message=result["message"],)
        except ValueError as error:
            return error_response(message=str(error),)

class CompleteRegistrationController(APIView):

    def post(self, request):
        email = request.data.get("email")
        name = request.data.get("name")
        password = request.data.get("password")

        use_case = AuthDependencies.complete_registration()
        try:
            user = use_case.execute(
                email=email,name=name,password=password,
            )
            return success_response(
                message="Registration completed successfully.",
                data={
                    "user": {
                        "id": user.id,
                        "email": user.email,
                        "name": user.name,
                    }
                },
                status_code=status.HTTP_201_CREATED,
            )
        
        except ValueError as error:
            return error_response(message=str(error))

class LoginWithPasswordController(APIView):

    def post(self, request):

        email = request.data.get("email")
        password = request.data.get("password")

        use_case = AuthDependencies.login_with_password()
        try:
            result = use_case.execute(
                email=email,password=password,
            )
            user = result["user"]

            return success_response(
                message="Login successful.",
                data={
                    "tokens": result["tokens"],
                    "user": {
                        "id": user.id,
                        "email": user.email,
                        "name": user.name,
                    },
                },
            )

        except ValueError as error:
            return error_response(message=str(error))

class SendLoginOTPController(APIView):

    def post(self, request):
        email = request.data.get("email")
        use_case = AuthDependencies.send_login_otp()
        
        try:
            result = use_case.execute(email)
            return success_response(
                message=result["message"],
            )

        except ValueError as error:
            return error_response(message=str(error))

class VerifyLoginOTPController(APIView):

    def post(self, request):

        email = request.data.get("email")
        otp = request.data.get("otp")
        use_case = AuthDependencies.verify_login_otp()

        try:
            result = use_case.execute(
                email=email,otp=otp,
            )
            user = result["user"]

            return success_response(
                message="Login successful.",
                data={
                    "tokens": result["tokens"],
                    "user": {
                        "id": user.id,
                        "email": user.email,
                        "name": user.name,
                    },
                },
            )

        except ValueError as error:
            return error_response(message=str(error))