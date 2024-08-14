FROM node:20

WORKDIR /app

COPY package*.json ./


# Will run this commented secrtion as part of a different docker that communicates via shared volumes

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



RUN useradd -ms /bin/bash ftpuser
RUN echo 'ftpuser:pass' | chpasswd

RUN npm install 


COPY . . 

ENV IP = '10.0.0.251'
ENV PORT=7004
ENV PORT2=3000
ENV KEY_FILE="key.pem"
ENV CERT_FILE="cert.pem"


EXPOSE 7004

CMD ["npm", "start"]