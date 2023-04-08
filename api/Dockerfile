FROM node:18.15.0

WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV API_PORT=8090
ENV DB_NAME=sathi
ENV DB_USER=postgres
ENV DB_PASSWORD=postgres
ENV DB_HOST=db
ENV DB_PORT=5432
ENV JWT_SECRET=uC6EupFo7*HtzFzX6hoJt9LbHwBgijxxd$79NXHpsiPfMg8pe2WG$b6i^*za4Jak&aBrscgaXpjvarzNSZX78DaaZTC8qctYKxv$gQn5AV

COPY package*.json ./

# If you are building your code for production
RUN npm ci --omit=dev

# Install the PostgreSQL client tools
RUN apt update && apt install -y postgresql-client

# Bundle app source
COPY . .

EXPOSE 8090

# ENTRYPOINT [ "tail -f /dev/null" ]
CMD [ "node", "index.js" ]
