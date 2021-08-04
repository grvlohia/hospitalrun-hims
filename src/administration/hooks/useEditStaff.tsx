import { queryCache, useMutation } from 'react-query'

import StaffRepository from '../../shared/db/StaffRepository'
import Staff from '../../shared/model/Staff'

async function updateStaff(updatedStaff: Staff) {
  const staff = await StaffRepository.saveOrUpdate(updatedStaff)
  return staff
}

export default function useEditStaff() {
  return useMutation(updateStaff, {
    onSuccess: async (data: Staff) => {
      queryCache.setQueryData(['staff', data.id], data)
    },
  })
}
