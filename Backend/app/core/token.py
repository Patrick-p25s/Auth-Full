from app.core.config import setting
import jwt
from datetime import datetime, timezone, timedelta


def create_token(donne: dict):
    payload = donne.copy()
    expires_token = datetime.now(timezone.utc) + timedelta(
        minutes=setting.EXPIRES_TOKEN
    )
    payload.update({"exp": expires_token})
    return jwt.encode(
        payload=payload, key=setting.SECRET_KEY, algorithm=setting.ALGORITHM
    )


def decode_token(token: str):
    try:
        decoded = jwt.decode(
            jwt=token, key=setting.SECRET_KEY, algorithms=[setting.ALGORITHM]
        )
        return decoded

    except jwt.ExpiredSignatureError:
        print("Token expiré")
        return None
    except jwt.InvalidTokenError:
        print("Token Invalid")
        return None


token = create_token({"id": 1, "name": "patrick"})
payload = decode_token(token=token)
