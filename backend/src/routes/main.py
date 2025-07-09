from fastapi import HTTPException, Header
from core.config import settings
from core.logging import logger

ALLOWED_EXTENSION = "jpg"

# Проверка токена
async def verify_token(token: str = Header(..., alias="x-token")):
    if not token.isascii():
        logger.warning(f"Недопустимый токен: содержит символы, не входящие в набор ASCII")
        raise HTTPException(status_code=400, detail="Токен содержит недопустимые символы. Разрешены только символы ASCII.")
    if token != settings.ACCESS_TOKEN:
        logger.warning(f"Недопустимый токен: {token}")
        raise HTTPException(status_code=403, detail="Недопустимый токен")
    return token
