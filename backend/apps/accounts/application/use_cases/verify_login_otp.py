class VerifyLoginOTP:

    def __init__(
        self,
        user_repository,
        otp_repository,
        token_service,
    ):
        self.user_repository = user_repository
        self.otp_repository = otp_repository
        self.token_service = token_service

    def execute(self, email: str, otp: str):

        email = email.strip().lower()
        otp = otp.strip()

        if not email or not otp:
            raise ValueError(
                "Email and OTP are required."
            )

        user = self.user_repository.get_by_email(email)

        if not user:
            raise ValueError("Invalid email.")

        if not user.is_email_verified:
            raise ValueError("Email is not verified.")

        otp_record = self.otp_repository.get_valid_otp(
            email=email,
            purpose="LOGIN",
        )

        if not otp_record:
            raise ValueError(
                "Invalid or expired OTP."
            )

        if otp_record.otp != otp:
            raise ValueError("Invalid OTP.")

        self.otp_repository.delete(otp_record)

        tokens = self.token_service.generate_tokens(user)
        print("Email:", email)
        print("Entered OTP:", otp)
        print("Database OTP:", otp_record.otp)

        return {
            "user": user,
            "tokens": tokens,
        }