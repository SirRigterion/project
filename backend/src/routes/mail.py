from fastapi import APIRouter, BackgroundTasks
from db.schemas import OrderForm
from core.config import settings
from core.logging import logger
from email.mime.text import MIMEText
from aiosmtplib import SMTP
import ssl
import threading
from itertools import count

router = APIRouter()

# Счетчик задач с блокировкой для потокобезопасности
_task_counter = count(1)
_task_lock = threading.Lock()

async def send_email(name: str, email: str, project_description: str):
    with _task_lock:
        task_id = next(_task_counter)

    try:
        message = MIMEText(f"Новый заказ!\n\nИмя: {name}\nEmail: {email}\nОписание: {project_description}")
        message["From"] = settings.SMTP_USERNAME
        message["To"] = settings.RECIPIENT_EMAIL
        message["Subject"] = f"Новый заказ от {name}"

        logger.info(f"Task {task_id}: Отправка письма на {settings.RECIPIENT_EMAIL}")

        ssl_context = ssl.create_default_context()
        ssl_context.minimum_version = ssl.TLSVersion.TLSv1_2

        smtp_client = SMTP(
            hostname=settings.SMTP_HOST,
            port=settings.SMTP_PORT,
            use_tls=True,
            timeout=10,
            tls_context=ssl_context
        )
        async with smtp_client:
            await smtp_client.login(settings.SMTP_USERNAME, settings.SMTP_PASSWORD)
            await smtp_client.send_message(message)

        logger.info(f"Task {task_id}: Письмо отправлено на {settings.RECIPIENT_EMAIL}")

    except Exception as e:
        logger.error(f"Task {task_id}: Ошибка при отправке письма: {str(e)}")

@router.post("/send")
async def create_order(form: OrderForm, background_tasks: BackgroundTasks):
    background_tasks.add_task(send_email, form.name, form.email, form.project_description)
    return {"message": "Заказ принят, мы свяжемся с вами!"}