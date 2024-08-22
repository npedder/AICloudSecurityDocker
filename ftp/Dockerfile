FROM node:20

WORKDIR /app

COPY package*.json ./

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