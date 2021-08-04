import { useQuery } from 'react-query'

import StaffRepository from '../../shared/db/StaffRepository'
import Staff from '../../shared/model/Staff'
import StaffSearchRequest from '../models/StaffSearchRequest'

interface StaffsResult {
  totalCount: number
  staffs: Staff[]
}

async function fetchStaffs(_: any, searchRequest: StaffSearchRequest): Promise<StaffsResult> {
  const staffs = await StaffRepository.search(searchRequest.queryString)
  const totalCount = await StaffRepository.count()
  return {
    totalCount,
    staffs,
  }
}

export default function useStaffs(searchRequest: StaffSearchRequest) {
  return useQuery(['staffs', searchRequest], fetchStaffs)
}
