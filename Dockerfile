FROM node:20-slim

RUN apt update && \
    apt upgrade -y && \
    apt install --no-install-recommends openssl procps -y && \
    rm -rf /var/lib/apt/lists/* && \
    npm install -g @nestjs/cli@10.4.8

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3050

CMD [ "npm", "run", "start:dev" ]