FROM python:3.10-slim

COPY ./src /app

WORKDIR /app
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

CMD ["python", "application.py"]


