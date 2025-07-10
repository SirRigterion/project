from fastapi import FastAPI
# from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from routes.navitems import router as router_navitems
from routes.projects import router as router_projects
from routes.services import router as router_services
from routes.mail import router as router_mail
from core.cache import init_cache, close_cache
from core.config import settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_cache()
    yield
    await close_cache()

app = FastAPI(lifespan=lifespan, title=settings.PROJECT_NAME, version=settings.PROJECT_VERSION, prefix="/api")


origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://45.159.208.67:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "DELETE"],
    allow_headers=["*"],
)

# app.mount("/images", StaticFiles(directory=settings.IMAGE_DIR), name="images")
app.include_router(router_navitems, prefix="/path")
app.include_router(router_projects, prefix="/img")
app.include_router(router_services, prefix="/img")
app.include_router(router_mail, prefix="/mail")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, workers=1, log_level="info", reload=True)