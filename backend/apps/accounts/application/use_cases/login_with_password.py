class LoginWithPassword:
    def __init__(self,user_repository,token_service):
        self.user_repository=user_repository
        self.token_service=token_service
    def execute(self,email:str,password:str):
        email=email.strip().lower()
        if not email or not password:
            raise ValueError("Email and password are required.")
        user=self.user_repository.get_by_email(email)
        if not user:
            raise ValueError("Invalid email or password.")
        if not user.is_email_verified:
            raise ValueError("Email is not verified.")
        if not user.check_password(password):
            raise ValueError("Invalid email or password.")
        tokens=self.token_service.generate_tokens(user)
        return{
            'user':user,
            "tokens":tokens,
        }