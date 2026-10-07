from rest_framework_simplejwt.tokens import RefreshToken
from apps.accounts.domain.services.token_service import TokenService

class DjangoJWTTokenService(TokenService):
    def generate_tokens(self, user):
        refresh=RefreshToken.for_user(user)
        return {
            'refresh':str(refresh),
            'access':str(refresh.access_token)
        }