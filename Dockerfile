FROM node:18.14
WORKDIR /usr/src/app

COPY package.json /.
COPY yarn.lock /.

RUN yarn install --no-progress --non-interactive --frozen-lockfile

COPY . .

EXPOSE 8545

RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]