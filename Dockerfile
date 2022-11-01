FROM node:16.14.0-alpine
# Create app directory
WORKDIR /usr/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN npm run build
COPY .env ./build
RUN npx prisma generate --schema=./src/database/prisma/schema.prisma
COPY ./src/certs ./build/src/certs
COPY ./src/database ./build/src/certs
WORKDIR /build
# RUN npx prisma generate --schema=./src/database/prisma/schema.prisma

EXPOSE 8080
CMD node server.js
