/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable camelcase */
// import { CouchConstants } from '@innohealthtech/common-constants'
import PouchDB from 'pouchdb'
import PouchAuth from 'pouchdb-authentication'
import PouchdbFind from 'pouchdb-find'
import RelationalPouch from 'relational-pouch'

const memoryAdapter = require('pouchdb-adapter-memory')
const search = require('pouchdb-quick-search')

PouchDB.plugin(search)
PouchDB.plugin(memoryAdapter)
PouchDB.plugin(RelationalPouch)
PouchDB.plugin(PouchdbFind)
PouchDB.plugin(PouchAuth)

export const schema = [
  {
    singular: 'patient',
    plural: 'patients',
    relations: {
      appointments: {
        hasMany: { type: 'appointment', options: { queryInverse: 'patient', async: true } },
      },
      labs: { hasMany: { type: 'lab', options: { queryInverse: 'patient', async: true } } },
      medications: {
        hasMany: { type: 'medication', options: { queryInverse: 'patient', async: true } },
      },
      imagings: { hasMany: { type: 'imaging', options: { queryInverse: 'patient', async: true } } },
    },
  },
  {
    singular: 'appointment',
    plural: 'appointments',
    relations: { patient: { belongsTo: 'patient' } },
  },
  {
    singular: 'incident',
    plural: 'incidents',
  },
  {
    singular: 'lab',
    plural: 'labs',
    relations: { patient: { belongsTo: 'patient' } },
  },
  {
    singular: 'imaging',
    plural: 'imagings',
    relations: { patient: { belongsTo: 'patient' } },
  },
  {
    singular: 'medication',
    plural: 'medications',
    relations: { patient: { belongsTo: 'patient' } },
  },
  {
    singular: 'staff',
    plural: 'staffs',
  },
]

class DbService {
  localDb: PouchDB.RelDatabase

  serverDb: PouchDB.Database | null

  replicationObj: PouchDB.Replication.Sync<any> | null

  localDbRecreated: boolean

  constructor() {
    this.localDb = new PouchDB('local_innohims').setSchema(schema)
    this.serverDb = null
    this.replicationObj = null
    this.localDbRecreated = false
  }

  public teardownServerDb() {
    if (!this.serverDb) {
      return
    }
    this.replicationObj?.cancel()
    this.replicationObj = null
    this.serverDb.close()
    this.serverDb = null
  }

  public configureForUser(username: string, password: string) {
    this.teardownServerDb()

    const userDb = `userdb-${Buffer.from(username, 'utf-8').toString('hex')}`

    this.serverDb = new PouchDB(
      // `${CouchConstants.SCHEME}://${CouchConstants.HOST}:${CouchConstants.PORT}/${userDb}`,
      `${process.env.REACT_APP_COUCHDB}/${userDb}`,
      {
        skip_setup: true,
        auth: {
          username,
          password,
        },
      },
    )
  }

  public startSyncing() {
    if (!this.serverDb) {
      throw new Error('ServerDb is not set.')
    }
    this.replicationObj = this.localDb.sync(this.serverDb, {
      live: true,
      retry: true,
    })
  }

  public getLocalDb() {
    return this.localDb
  }

  public getServerDb() {
    if (!this.serverDb) {
      throw new Error('Server Db is not configured. Please Log In to configure')
    }
    return this.serverDb
  }

  public async recreateLocalDb() {
    await this.localDb.destroy()
    this.localDb = new PouchDB('local_innohims').setSchema(schema)
    this.localDbRecreated = true
  }
}

export default new DbService()
