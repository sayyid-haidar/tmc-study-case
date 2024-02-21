FROM node:18

WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 3000

ENTRYPOINT ["sh", "docker-entrypoint.sh"]