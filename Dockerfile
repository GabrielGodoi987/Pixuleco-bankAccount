FROM node:20-slim

RUN apt update && \
    apt upgrade -y && \
    apt install --no-install-recommends openssl procps -y && \
    rm -rf /var/lib/apt/lists/* && \
    npm install -g @nestjs/cli@10.4.8

WORKDIR /app

COPY package*.json ./


RUN npm install

COPY . .

RUN npm run build

RUN npm run migration:run

EXPOSE 3050

CMD [ "npm", "run", "start:dev" ]