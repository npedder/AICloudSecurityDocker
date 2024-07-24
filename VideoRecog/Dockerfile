FROM ultralytics/ultralytics:latest

WORKDIR /app

# Will run this commented section as part of a different docker that communicates via shared volumes

# RUN python3 -m venv /app/VideoRecog/.venv && source /app/VideoRecog/.venv/bin/activate
# RUN which python



# RUN set -xe \
#     && apt-get update \
#     && apt install python3.11-venv \
#     && apt-get install python3-pip -y \
#     && python3 -m venv /app/VideoRecog/.venv \
#     && source /app/VideoRecog/.venv/bin/activate

# RUN pip install --upgrade pip
# RUN pip install -r requirements.txt

COPY . . 

CMD ["ls"]
CMD ["python3", "main.py" , "/app/IMG_1302.JPEG"]

