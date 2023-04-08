# Build Sathi Project
FROM nginx:1.22

# Install NodeJS
ENV NODE_VERSION=18.15.0
RUN apt install -y curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN node --version
RUN npm --version

# Copy Codebase
WORKDIR /usr/src/
RUN mkdir api
RUN mkdir ui

COPY ./api ./api
COPY ./ui ./ui
COPY ./startup.sh ./startup.sh

RUN ["chmod", "+x", "/usr/src/startup.sh"]

# Setup UI

WORKDIR /usr/src/ui

# Install UI dependencies
RUN npm ci
RUN npm run build

# Setup API
WORKDIR /usr/src/api

RUN npm ci
RUN npm start

# Copy Website static content
WORKDIR /usr/src
RUN rm /usr/share/nginx/html/*

COPY ./ui/build /usr/share/nginx/html

# Configure nginx
COPY ./api/deploy/nginx.conf /etc/nginx/nginx.conf

# Start API
WORKDIR /usr/src/api
RUN npm start

WORKDIR /usr/src

EXPOSE 80

RUN ls

CMD ["/bin/bash", "./startup.sh"]
# CMD ["nginx", "-g", "daemon ;"]
