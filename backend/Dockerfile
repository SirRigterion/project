FROM python:3.13.3-slim

COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --no-cache-dir "fastapi-cache2[redis]"

COPY . .

RUN chmod +x prestart.sh

ENTRYPOINT ["./prestart.sh"]
CMD ["python", "src/main.py"]
