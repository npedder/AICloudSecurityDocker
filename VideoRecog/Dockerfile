FROM ultralytics/ultralytics:latest

WORKDIR /app

RUN pip install watchdog
# Will run this commented section as part of a different docker that communicates via shared volumes

COPY . . 

CMD ["python3", "main.py" , "/app/IMG_1302.JPEG"]

