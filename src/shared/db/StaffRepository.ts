import escapeStringRegexp from 'escape-string-regexp'

import DbService from '../config/pouchdb'
import Staff from '../model/Staff'
import generateCode from '../util/generateCode'
import Repository from './Repository'

class StaffRepository extends Repository<Staff> {
  constructor() {
    super('staff', DbService.getLocalDb())
  }

  async search(text: string): Promise<Staff[]> {
    super.refreshRelationalDb()
    const escapedString = escapeStringRegexp(text)
    return super.search({
      selector: {
        $or: [
          {
            'data.loginName': {
              $regex: RegExp(escapedString, 'i'),
            },
          },
          {
            'data.primaryEmail': {
              $regex: RegExp(escapedString, 'i'),
            },
          },
        ],
      },
    })
  }

  async save(entity: Staff): Promise<Staff> {
    super.refreshRelationalDb()
    entity.metadata = {
      docType: 'staff',
    }
    const staffCode = generateCode('S')
    entity.code = staffCode
    const saveResult = await super.save(entity)
    return this.find(saveResult.id)
  }
}

export default new StaffRepository()
