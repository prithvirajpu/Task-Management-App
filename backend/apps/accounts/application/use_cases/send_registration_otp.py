class SendRegistrationOTP:

    def __init__(self,
        user_repository,
        otp_repository,
        email_service,):
        self.user_repository = user_repository
        self.otp_repository = otp_repository
        self.email_service = email_service

    def execute(self, email: str):
        pass
    