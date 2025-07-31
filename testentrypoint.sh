#!/bin/sh

HOST="db" # Ou o nome do serviço do seu PostgreSQL no Docker Compose
PORT="5432"

echo "Waiting for PostgreSQL database to be ready..."

# Loop enquanto a conexão com o host:port não for bem-sucedida
while ! nc -z $HOST $PORT; do
    echo "PostgreSQL is unavailable - sleeping"
    sleep 1 # WAITING ONE SECOD TO INITIATE
done


echo 'application starting'


npm run build
npm run migration:run
npm run seed
npm run start:dev