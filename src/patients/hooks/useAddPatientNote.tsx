import isEmpty from 'lodash/isEmpty'
import { queryCache, useMutation } from 'react-query'

import PatientRepository from '../../shared/db/PatientRepository'
import Note from '../../shared/model/Note'
import { uuid } from '../../shared/util/uuid'
import validateNote from '../util/validate-note'

const patientRepository = new PatientRepository()

interface AddNoteRequest {
  patientId: string
  note: Omit<Note, 'id'>
}

async function addNote(request: AddNoteRequest): Promise<Note[]> {
  const error = validateNote(request.note)

  if (isEmpty(error)) {
    const patient = await patientRepository.find(request.patientId)
    const notes = patient.notes ? [...patient.notes] : []
    const newNote: Note = {
      id: uuid(),
      ...request.note,
    }
    notes.push(newNote)

    await patientRepository.saveOrUpdate({
      ...patient,
      notes,
    })

    return notes
  }

  throw error
}

export default function useAddPatientNote() {
  return useMutation(addNote, {
    onSuccess: async (data, variables) => {
      await queryCache.setQueryData(['notes', variables.patientId], data)
    },
    throwOnError: true,
  })
}
