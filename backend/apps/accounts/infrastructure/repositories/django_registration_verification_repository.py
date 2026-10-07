from django.utils import timezone

from apps.accounts.domain.repositories.registration_verification_repository import (
    RegistrationVerificationRepository,
)
from apps.accounts.models import RegistrationVerification


class DjangoRegistrationVerificationRepository(
    RegistrationVerificationRepository
):

    def save(self, verification_data: dict):
        return RegistrationVerification.objects.update_or_create(
            email=verification_data["email"],
            defaults={
                "verified": verification_data["verified"],
                "expires_at": verification_data["expires_at"],
            },
        )[0]

    def get_valid(self, email: str):
        return RegistrationVerification.objects.filter(
            email=email,
            verified=True,
            expires_at__gt=timezone.now(),
        ).first()

    def mark_verified(self, verification):
        verification.verified = True
        verification.save(update_fields=["verified"])

        return verification

    def delete(self, verification):
        verification.delete()