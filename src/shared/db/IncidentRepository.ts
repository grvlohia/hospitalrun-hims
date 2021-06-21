import IncidentFilter from '../../incidents/IncidentFilter'
import DbService from '../config/pouchdb'
import Incident from '../model/Incident'
import Repository from './Repository'

const relationalDb = DbService.getLocalDb()

interface SearchOptions {
  status: IncidentFilter
}
class IncidentRepository extends Repository<Incident> {
  constructor() {
    super('incident', relationalDb)
  }

  async search(options: SearchOptions): Promise<Incident[]> {
    return super.search(IncidentRepository.getSearchCriteria(options))
  }

  private static getSearchCriteria(options: SearchOptions): any {
    const statusFilter =
      options.status !== IncidentFilter.all ? [{ 'data.status': options.status }] : []
    const selector = {
      $and: statusFilter,
    }
    return {
      selector,
    }
  }
}

export default new IncidentRepository()
