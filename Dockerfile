## build development ready image
ARG IMAGE=node:22-alpine

#commo layer
# from construction variable create an named initiator(builder)
FROM ${IMAGE} AS builder

# Defines an base directory to subsequences commands
WORKDIR /http/app

# COPY all the directories and files from the host machine to the container
COPY . .

# Copy the package json into the project
COPY package*.json ./

RUN npm install

#Dev layer
FROM builder AS dev

COPY ./entrypoint.sh /entrypoint.sh

# give the necessary permissions to the entrypoint file
RUN chmod +x /entrypoint.sh

## entrypoint allows us to encapsulate and run additional scripts in a specific file
## it works similar to the CMD command, however we are running a diferent file here
ENTRYPOINT ["/entrypoint.sh"]
