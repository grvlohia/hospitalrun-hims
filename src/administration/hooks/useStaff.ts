import { useQuery } from 'react-query'

import StaffRepository from '../../shared/db/StaffRepository'
import Staff from '../../shared/model/Staff'

async function fetchStaff(_: any, id?: string): Promise<Staff> {
  const staff = await StaffRepository.find(id || '')
  return staff
}

export default function useStaff(id?: string) {
  return useQuery(['staff', id], fetchStaff, { enabled: id })
}
