from sqlalchemy import String, Integer
from sqlalchemy.orm import Mapped, mapped_column
# from db.database import Base
from .base import Base
class Project(Base):
    __tablename__ = "projects"
    
    project_id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    project_title: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    project_description: Mapped[str] = mapped_column(String(300), nullable=False)
    project_img: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    project_category: Mapped[str] = mapped_column(String(255), nullable=False)
    project_link: Mapped[str] = mapped_column(String(255), nullable=True)

class NavItem(Base):
    __tablename__ = "nav_items"
    
    nav_item_id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    nav_item_label: Mapped[str] = mapped_column(String(50), nullable=False)
    nav_item_to: Mapped[str] = mapped_column(String(100), nullable=False)
    nav_item_section: Mapped[str] = mapped_column(String(50), nullable=False)

class Service(Base):
    __tablename__ = "services"
    
    service_id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    service_title: Mapped[str] = mapped_column(String(50), nullable=False)
    service_price: Mapped[str] = mapped_column(String(50), nullable=False)
    service_description: Mapped[str] = mapped_column(String(300), nullable=False)
