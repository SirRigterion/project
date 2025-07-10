from fastapi import APIRouter, HTTPException, Depends
from fastapi_cache.decorator import cache
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete
from core.logging import logger
from db.database import get_db
from db.models import NavItem
from db.schemas import NavItemCreate
from .main import verify_token

router = APIRouter()

# Навигационные элементы
@router.get("/navitems")
# @cache(expire=300)
async def get_navitems(db: AsyncSession = Depends(get_db)):
    try:
        result = await db.execute(select(NavItem))
        nav_items = result.scalars().all()
        return [
            {
                "label": item.nav_item_label,
                "to": item.nav_item_to,
                "section": item.nav_item_section
            } for item in nav_items
        ]
    except Exception as e:
        logger.error(f"Ошибка при загрузке элементов навигации: {str(e)}")
        raise HTTPException(status_code=500, detail="Ошибка при загрузке элементов навигации")

@router.post("/navitems")
async def create_navitem(item: NavItemCreate, db: AsyncSession = Depends(get_db), token: str = Depends(verify_token)):
    try:
        nav_item = NavItem(
            nav_item_label=item.nav_item_label,
            nav_item_to=item.nav_item_to,
            nav_item_section=item.nav_item_section
        )
        db.add(nav_item)
        await db.commit()
        await db.refresh(nav_item)
        return {
            "nav_item_id": nav_item.nav_item_id,
            "nav_item_label": nav_item.nav_item_label,
            "nav_item_to": nav_item.nav_item_to,
            "nav_item_section": nav_item.nav_item_section
        }
    except Exception as e:
        logger.error(f"Ошибка создания элемента навигации: {str(e)}")
        await db.rollback()
        raise HTTPException(status_code=500, detail="Ошибка создания элемента навигации")

@router.delete("/navitems/{nav_item_id}")
async def delete_navitem(nav_item_id: int, db: AsyncSession = Depends(get_db), token: str = Depends(verify_token)):
    try:
        result = await db.execute(select(NavItem).filter(NavItem.nav_item_id == nav_item_id))
        nav_item = result.scalar_one_or_none()
        if not nav_item:
            raise HTTPException(status_code=404, detail="Элемент навигации не найден")
        
        await db.execute(delete(NavItem).filter(NavItem.nav_item_id == nav_item_id))
        await db.commit()
        return {"message": "Элемент навигации успешно удален"}
    except Exception as e:
        logger.error(f"Ошибка удаления элемента навигации:{str(e)}")
        await db.rollback()
        raise HTTPException(status_code=500, detail="Ошибка удаления элемента навигации")
