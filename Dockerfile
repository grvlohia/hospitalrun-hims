FROM node:14

# Create app directory
RUN mkdir -p /usr/src/app/build
RUN mkdir -p /usr/src/app/serve
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install --only=production
RUN npm run build
RUN npm --prefix serve install serve

# Bundle app source
COPY run.sh /use/src/app
COPY serve/. /usr/src/app/serve
COPY build/. /usr/src/app/build

# Arguments to the docker run command
ARG APP_PORT=5000

# Setting environment variables in docker container
ENV CONTAINER_PORT=$APP_PORT

EXPOSE $APP_PORT

CMD [ "sh", "run.sh" ]
