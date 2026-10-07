from apps.accounts.domain.repositories.user_repository import UserRepository


class CompleteRegistration:

    def __init__(
        self,
        user_repository,
        verification_repository,
    ):
        self.user_repository = user_repository
        self.verification_repository = verification_repository

    def execute(self,email: str,name: str,password: str,):

        email = email.strip().lower()
        name = name.strip()

        if not email:
            raise ValueError("Email is required.")

        if not name:
            raise ValueError("Name is required.")

        if not password:
            raise ValueError("Password is required.")

        if self.user_repository.exists_by_email(email):
            raise ValueError(
                "An account with this email already exists."
            )

        verification = self.verification_repository.get_valid(email)

        if not verification:
            raise ValueError(
                "Email verification is required."
            )

        user = self.user_repository.create(
            email=email,
            name=name,
            password=password,
            is_email_verified=True,
        )

        self.verification_repository.delete(verification)

        return user