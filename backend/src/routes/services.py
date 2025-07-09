from fastapi import APIRouter, HTTPException, Depends
from fastapi_cache.decorator import cache
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete
from core.logging import logger
from db.database import get_db
from db.models import Service
from db.schemas import ServiceCreate
from .main import verify_token

router = APIRouter()

# Услуги
@router.get("/services")
@cache(expire=300)
async def get_services(db: AsyncSession = Depends(get_db)):
    try:
        result = await db.execute(select(Service))
        services = result.scalars().all()
        return [
            {
                "title": service.service_title,
                "price": service.service_price,
                "description": service.service_description
            } for service in services
        ]
    except Exception as e:
        logger.error(f"Ошибка загрузки услуги: {str(e)}")
        raise HTTPException(status_code=500, detail="Ошибка загрузки услуги")

@router.post("/services")
async def create_service(service: ServiceCreate, db: AsyncSession = Depends(get_db), token: str = Depends(verify_token)):
    try:
        db_service = Service(
            service_title=service.service_title,
            service_price=service.service_price,
            service_description=service.service_description
        )
        db.add(db_service)
        await db.commit()
        await db.refresh(db_service)
        return {
            "service_id": db_service.service_id,
            "service_title": db_service.service_title,
            "service_price": db_service.service_price,
            "service_description": db_service.service_description
        }
    except Exception as e:
        logger.error(f"Ошибка создания услуги: {str(e)}")
        await db.rollback()
        raise HTTPException(status_code=500, detail="Ошибка создания услуги")

@router.delete("/services/{service_id}")
async def delete_service(service_id: int, db: AsyncSession = Depends(get_db), token: str = Depends(verify_token)):
    try:
        result = await db.execute(select(Service).filter(Service.service_id == service_id))
        service = result.scalar_one_or_none()
        if not service:
            raise HTTPException(status_code=404, detail="Услуга не найдена")
        
        await db.execute(delete(Service).filter(Service.service_id == service_id))
        await db.commit()
        return {"message": "Услуга успешно удалена"}
    except Exception as e:
        logger.error(f"Ошибка удаления услуга: {str(e)}")
        await db.rollback()
        raise HTTPException(status_code=500, detail="Ошибка удаления услуга")
