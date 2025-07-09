from fastapi import APIRouter, HTTPException, Depends
from fastapi_cache.decorator import cache
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete
from core.logging import logger
from db.database import get_db
from db.models import Project
from db.schemas import ProjectCreate
from .main import verify_token


router = APIRouter()

# Проекты
@router.get("/projects")
@cache(expire=300)
async def get_projects(db: AsyncSession = Depends(get_db)):
    try:
        result = await db.execute(select(Project))
        projects = result.scalars().all()
        return [
            {
                "id": str(project.project_id),
                "title": project.project_title,
                "description": project.project_description,
                "img": project.project_img,
                "category": project.project_category,
                "link": project.project_link
            } for project in projects
        ]
    except Exception as e:
        logger.error(f"Ошибка при загрузке проектов: {str(e)}")
        raise HTTPException(status_code=500, detail="Ошибка при загрузке проектов")

@router.post("/projects")
async def create_project(project: ProjectCreate, db: AsyncSession = Depends(get_db), token: str = Depends(verify_token)):
    try:
        db_project = Project(
            project_title=project.project_title,
            project_description=project.project_description,
            project_img=project.project_img,
            project_category=project.project_category,
            project_link=project.project_link
        )
        db.add(db_project)
        await db.commit()
        await db.refresh(db_project)
        return {
            "id": str(db_project.project_id),
            "title": db_project.project_title,
            "description": db_project.project_description,
            "img": db_project.project_img,
            "category": db_project.project_category,
            "link": db_project.project_link
        }
    except Exception as e:
        logger.error(f"Ошибка создания проекта: {str(e)}")
        await db.rollback()
        raise HTTPException(status_code=500, detail="Ошибка создания проекта")

@router.delete("/projects/{project_id}")
async def delete_project(project_id: int, db: AsyncSession = Depends(get_db), token: str = Depends(verify_token)):
    try:
        result = await db.execute(select(Project).filter(Project.project_id == project_id))
        project = result.scalar_one_or_none()
        if not project:
            raise HTTPException(status_code=404, detail="Проект не найден")
        
        await db.execute(delete(Project).filter(Project.project_id == project_id))
        await db.commit()
        return {"message": "Проект успешно удален"}
    except Exception as e:
        logger.error(f"Ошибка удаления проекта: {str(e)}")
        await db.rollback()
        raise HTTPException(status_code=500, detail="Ошибка удаления проекта")
