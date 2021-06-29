import DbService from '../config/pouchdb'
import Staff from '../model/Staff'
import Repository from './Repository'

class StaffRepository extends Repository<Staff> {
  constructor() {
    super('staff', DbService.getLocalDb())
  }

  async search(text: string): Promise<Staff[]> {
    super.refreshRelationalDb()
    return super.search({
      selector: {
        $or: [
          {
            'data.loginName': text,
          },
          {
            'data.primaryEmail': text,
          },
        ],
      },
    })
  }

  async save(entity: Staff): Promise<Staff> {
    super.refreshRelationalDb()
    const saveResult = await super.save(entity)
    return this.find(saveResult.id)
  }
}

export default StaffRepository
