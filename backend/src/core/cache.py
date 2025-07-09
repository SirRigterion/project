import asyncio
from redis import asyncio as aioredis
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from fastapi_cache.backends.inmemory import InMemoryBackend
from .config import settings
from .logging import logger

redis_available = False
redis_client = None

async def init_cache():
    global redis_available, redis_client
    redis_available = False
    redis_client = None
    logger.info(f"Начало инициализации кэша, REDIS_URL: {settings.REDIS_URL}, NUMBER_ATTEMPTS: {settings.NUMBER_ATTEMPTS}")

    for attempt in range(1, settings.NUMBER_ATTEMPTS + 1):
        try:
            redis_client = await aioredis.from_url(
                settings.REDIS_URL,
                encoding="utf-8",
                decode_responses=False,
                health_check_interval=30
            )
            await redis_client.ping()
            logger.info("Перед инициализацией FastAPICache с Redis")
            FastAPICache.init(RedisBackend(redis_client), prefix="fastapi-cache")
            redis_available = True
            logger.info(f"Redis подключен на попытке {attempt}")
            break
        except (aioredis.ConnectionError, aioredis.TimeoutError, aioredis.RedisError) as e:
            logger.warning(f"Попытка {attempt}: Ошибка подключения к Redis: {type(e).__name__}: {e}")
            if redis_client:
                try:
                    await redis_client.close()
                except Exception as close_err:
                    logger.warning(f"Ошибка при закрытии клиента Redis: {close_err}")
                redis_client = None
            if attempt < settings.NUMBER_ATTEMPTS:
                logger.info(f"Ожидание 1 секунды перед попыткой {attempt + 1}")
                await asyncio.sleep(1)
    else:
        logger.error("Не удалось подключиться к Redis после всех попыток")
        logger.info("Инициализация FastAPICache с InMemoryBackend")
        FastAPICache.init(InMemoryBackend(), prefix="fastapi-cache")
        redis_available = False
        redis_client = None

    logger.info(f"Инициализация кэша завершена, redis_available: {redis_available}")

async def close_cache():
    global redis_client
    if redis_client:
        try:
            await redis_client.close()
            logger.info("Redis отключён")
        except Exception as e:
            logger.warning(f"Ошибка отключения от Redis: {str(e)}")
        redis_client = None