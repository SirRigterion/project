from pydantic import BaseModel, EmailStr, Field

class NavItemCreate(BaseModel):
    nav_item_label: str = Field(..., min_length=1, max_length=50, description="Название пункта навигации")
    nav_item_to: str = Field(..., min_length=1, max_length=100, description="URL для пункта навигации")
    nav_item_section: str = Field(..., min_length=1, max_length=50, description="Секция для пункта навигации")

class ServiceCreate(BaseModel):
    service_title: str = Field(..., min_length=1, max_length=50, description="Название услуги")
    service_price: str = Field(..., min_length=1, max_length=50, description="Цена услуги")
    service_description: str = Field(..., min_length=1, max_length=300, description="Описание услуги")

class ProjectCreate(BaseModel):
    project_title: str = Field(..., min_length=1, max_length=50, description="Название проекта")
    project_description: str = Field(..., min_length=1, max_length=300, description="Описание проекта")
    project_img: str = Field(..., min_length=1, max_length=100, description="Путь к изображению проекта")
    project_category: str = Field(..., min_length=1, max_length=255, description="Категория проекта")
    project_link: str | None = Field(None, max_length=255, description="Ссылка на проект")

class OrderForm(BaseModel):
    name: str = Field(..., min_length=1, max_length=100, description="Имя пользователя")
    email: EmailStr = Field(..., description="Email пользователя")
    project_description: str = Field(..., min_length=1, max_length=1000, description="Описание проекта")