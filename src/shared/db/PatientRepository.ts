import escapeStringRegexp from 'escape-string-regexp'

import DbService from '../config/pouchdb'
import Appointment from '../model/Appointment'
import Lab from '../model/Lab'
import Medication from '../model/Medication'
import Patient from '../model/Patient'
import generateCode from '../util/generateCode'
import Repository from './Repository'

const relationalDb = DbService.getLocalDb()
class PatientRepository extends Repository<Patient> {
  constructor() {
    super('patient', relationalDb)
    relationalDb.createIndex({
      index: { fields: ['_id', 'data.fullName', 'data.code'] },
    })
  }

  async search(text: string): Promise<Patient[]> {
    super.refreshRelationalDb()
    const escapedString = escapeStringRegexp(text)
    return super.search({
      selector: {
        $or: [
          {
            'data.fullName': {
              $regex: RegExp(escapedString, 'i'),
            },
          },
          {
            'data.code': text,
          },
        ],
      },
    })
  }

  async save(entity: Patient): Promise<Patient> {
    super.refreshRelationalDb()
    const patientCode = generateCode('P')
    entity.code = patientCode
    const saveResult = await super.save(entity)
    return this.find(saveResult.id)
  }

  async createIndex() {
    super.refreshRelationalDb()
    return this.db.createIndex({
      index: { fields: ['index'] },
    })
  }

  async getAppointments(patientId: string): Promise<Appointment[]> {
    super.refreshRelationalDb()
    const result = await this.db.rel.findHasMany('appointment', 'patient', patientId)
    return result.appointments
  }

  async getLabs(patientId: string): Promise<Lab[]> {
    super.refreshRelationalDb()
    const result = await this.db.rel.findHasMany('lab', 'patient', patientId)
    return result.labs
  }

  async getMedications(patientId: string): Promise<Medication[]> {
    super.refreshRelationalDb()
    const result = await this.db.rel.findHasMany('medication', 'patient', patientId)
    return result.medications
  }
}

export default new PatientRepository()
