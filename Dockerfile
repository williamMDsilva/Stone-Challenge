# [BUILD] - stage
FROM node:20-slim AS build

RUN apt-get update -y && apt-get install -y openssl
RUN apt-get install -y build-essential libpq-dev

WORKDIR /app

COPY package*.json .
COPY yarn.lock yarn.lock
COPY run-dev.sh run-dev.sh
COPY prisma/. prisma/.
RUN chmod +x ./run-dev.sh
RUN yarn
COPY . .
EXPOSE 4040
RUN yarn build
RUN yarn prisma generate

# [PRODUCTION] - stage
FROM node:20-slim AS production

RUN apt-get update -y && apt-get install -y openssl
RUN apt-get install -y build-essential libpq-dev

WORKDIR /app

COPY package*.json .
COPY yarn.lock yarn.lock
COPY run.sh run.sh
COPY prisma/. prisma/.
RUN chmod +x ./run.sh
RUN yarn
COPY . .

COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /app/build ./build

RUN yarn build
RUN yarn prisma generate

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "build/src/main.js" " --host", "0.0.0.0"]