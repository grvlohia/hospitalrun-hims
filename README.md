# HIMS Frontend

# Start Couch DB

- Install `docker` and `docker-compose`
- Execute `./couchdb/couchdb-init.bat` on Windows or `./couchdb/couchdb-init.sh` on UNIX like systems
- In web browser open: http://localhost:5984/_utils

# Running development build

- Execute command `npm install`.
- Execute command `npm start`. It should open web page in the web browser.

# Running production build

- Execute command `npm install`
- Execute command `npm run build`
- Execute command `npm install serve`
- Execute command `node ./node_modules/serve/bin/serve.js -s build -l 5000`
- In web browser open http://localhost:5000

# Helpful links

- Build configuration details here: https://create-react-app.dev/docs/advanced-configuration/
