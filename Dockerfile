##########
## DEPS ##
##########
FROM node:19 AS deps
# RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile

####################
## Native Binaries Deps ##
####################
FROM --platform=amd64 node:19 AS binaries-deps
# RUN apk add --no-cache libc6-compat
WORKDIR /app
# Prisma client
COPY --from=deps /app/node_modules ./node_modules

#############
## BUILDER ##
#############
FROM node:19 AS builder
WORKDIR /app
COPY --from=binaries-deps /app/node_modules ./node_modules
ENV NODE_ENV=development

# Bundle app source
COPY . .
ENV DATABASE_URL postgresql://zero@localhost:5432/away-naija?schema=public
RUN yarn generate
RUN yarn build
############
## RUNNER ##
############
FROM --platform=amd64 node:19 AS runner

WORKDIR /app

ENV NODE_ENV development

RUN addgroup --system --gid 1001 nodejs

COPY --from=builder /app/src ./src
COPY --from=builder /app/src/package.json ./src/package.json

# WORKDIR /build
# COPY .env ./build/
# COPY ./src/certs ./build/certs
# RUN yarn run generate
# RUN yarn run migrate:dev

EXPOSE 8080

ENV PORT 8080

CMD [ "yarn", "start" ]