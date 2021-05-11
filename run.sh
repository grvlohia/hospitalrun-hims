#!/bin/sh

export APP_DIR=/usr/src/app

#Start the automation service
cd $APP_DIR

echo "#################################"
echo "# Starting HIM Frontend Service #"
echo "#################################"
echo

echo "Node Version: $(node -v)"
echo "Npm Version:  $(npm -v)"
echo "Couch DB URL: ${COUCHDB_HOST}"

export port=${SERVICE_PORT}
DB_URL="${COUCHDB_SCHM}://${COUCHDB_USER}:${COUCHDB_PASS}@${COUCHDB_HOST}:${COUCHDB_PORT}"
echo "DB_URL: ${DB_URL}"
CURL="curl -X PUT ${DB_URL}/"
${CURL}_global_changes
${CURL}_users/_security -d '{}'
${CURL}hospitalrun\?partitioned=false
${CURL}hospitalrun/_security -d '{"members": {}, "admins": {"roles\": ["_admin"] }}'
${CURL}_users/org.couchdb.user:username -H "Accept: application/json" -H "Content-Type: application/json" -d '{"name": "username", "password": "password", "metadata": { "givenName": "John", "familyName": "Doe"}, "roles": [], "type": "user"}'

export REACT_APP_HOSPITALRUN_API=${DB_URL}

npm run start
