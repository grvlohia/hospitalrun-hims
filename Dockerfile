FROM node:14

# Create app directory
RUN mkdir -p /usr/src/app/build
RUN mkdir -p /usr/src/app/serve
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . .
# Build conf here: https://create-react-app.dev/docs/advanced-configuration/
RUN npm run build
RUN rm -rf node_modules couchdb src package.json package-lock.json .dockerignore Dockerfile nginx.conf azure.yaml scripts tsconfig.json

# Arguments to the docker run command
ARG APP_PORT=5000

# Setting environment variables in docker container
ENV CONTAINER_PORT=$APP_PORT

EXPOSE $APP_PORT

CMD [ "sh", "run.sh" ]
