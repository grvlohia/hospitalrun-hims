const STAFF_ROLES = {
  TENANT_ADMIN: 'tenant-admin',
  DOCTOR: 'doctor',
  LAB_ASSISTANT: 'lab-assistant',
  RECEPTIONIST: 'receptionist',
  CASHIER: 'cashier',
  PHYSIOTHERAPIST: 'physiotherapist',
}
const MODULES = {
  ADMIN: 'admin',
  REGISTRATION: 'registration',
  PAYMENT: 'payment',
  PATIENT: 'patient',
  DOCTOR: 'doctor',
  LAB: 'lab',
  PHYSIOTHERAPY: 'physiotherapy',
}
const ROLE_TO_MODULE = {
  [STAFF_ROLES.TENANT_ADMIN]: [MODULES.ADMIN],
  [STAFF_ROLES.DOCTOR]: [MODULES.DOCTOR, MODULES.PATIENT],
  [STAFF_ROLES.LAB_ASSISTANT]: [MODULES.LAB, MODULES.PATIENT],
  [STAFF_ROLES.RECEPTIONIST]: [MODULES.PATIENT, MODULES.REGISTRATION],
  [STAFF_ROLES.CASHIER]: [MODULES.PATIENT, MODULES.PAYMENT],
  [STAFF_ROLES.PHYSIOTHERAPIST]: [MODULES.PATIENT, MODULES.PHYSIOTHERAPY],
}

export default Object.freeze({
  COUCH_USER_PREFIX: 'org.couchdb.user:',
  CODES: {
    NotFound: 404,
    Conflict: 409,
    AlreadyExists: 412,
  },
  SCHEME: process.env.COUCHDB_SCHM || 'http',
  USER: process.env.COUCHDB_USER || 'admin',
  PASS: process.env.COUCHDB_PASS || 'password',
  HOST: process.env.COUCHDB_HOST || 'localhost',
  PORT: process.env.COUCHDB_PORT || '5995',
  LOCAL_PORT: process.env.COUCHDB_LOCAL_PORT || '5984',
  STAFF_ROLES,
  MODULES,
  ROLE_TO_MODULE,
})
