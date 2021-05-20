export default {
  patient: {
    label: 'Patient',
    code: 'Patient Code',
    firstName: 'First Name',
    lastName: 'Last Name',
    suffix: 'Suffix',
    prefix: 'Prefix',
    givenName: 'Given Name',
    familyName: 'Family Name',
    dateOfBirth: 'Date of Birth',
    approximateDateOfBirth: 'Approximate Date of Birth',
    age: 'Age',
    approximateAge: 'Approximate Age',
    placeOfBirth: 'Place of Birth',
    sex: 'Sex',
    bloodType: 'Blood Type',
    contactInfoType: {
      label: 'Type',
      options: {
        home: 'Home',
        mobile: 'Mobile',
        work: 'Work',
        temporary: 'Temporary',
        old: 'Old',
      },
    },
    phoneNumber: 'Phone Number',
    email: 'Email',
    address: 'Address',
    occupation: 'Occupation',
    type: 'Patient Type',
    preferredLanguage: 'Preferred Language',
    basicInformation: 'Basic Information',
    generalInformation: 'General Information',
    contactInformation: 'Contact Information',
    unknownDateOfBirth: 'Unknown',
    relatedPerson: 'Related Person',
    relatedPersons: {
      error: {
        unableToAddRelatedPerson: 'Unable to add new related person.',
        relatedPersonRequired: 'Related Person is required.',
        relationshipTypeRequired: 'Relationship Type is required.',
      },
      label: 'Related Persons',
      new: 'New Related Person',
      add: 'Add Related Person',
      relationshipType: 'Relationship Type',
      warning: {
        noRelatedPersons: 'No related persons',
      },
      addRelatedPersonAbove: 'Add a related person using the button above.',
    },
    appointments: {
      new: 'Add Appointment',
      warning: {
        noAppointments: 'No Appointments',
      },
      addAppointmentAbove: 'Add an appointment using the button above.',
    },
    allergies: {
      label: 'Allergies',
      allergyName: 'Allergy Name',
      new: 'Add Allergy',
      error: {
        nameRequired: 'Name is required.',
        unableToAdd: 'Unable to add allergy.',
      },
      warning: {
        noAllergies: 'No Allergies',
      },
      addAllergyAbove: 'Add an allergy using the button above.',
      successfullyAdded: 'Successfully added a new allergy!',
    },
    diagnoses: {
      label: 'Diagnoses',
      new: 'Add Diagnosis',
      edit: 'Edit Diagnosis',
      diagnosisName: 'Name',
      diagnosisDate: 'Date',
      onsetDate: 'Onset Date',
      abatementDate: 'Abatement Date',
      visit: 'Visit',
      status: 'Status',
      active: 'Active',
      recurrence: 'Recurrence',
      relapse: 'Relapse',
      inactive: 'Inactive',
      remission: 'Remission',
      resolved: 'Resolved',
      note: 'Note',
      warning: {
        noDiagnoses: 'No Diagnoses',
      },
      error: {
        nameRequired: 'Diagnosis Name is required.',
        dateRequired: 'Diagnosis Date is required.',
        unableToAdd: 'Unable to add new diagnosis',
      },
      addDiagnosisAbove: 'Add a diagnosis using the button above.',
      successfullyAdded: 'Successfully added a new diagnosis!',
    },
    note: 'Note',
    notes: {
      label: 'Notes',
      new: 'Add New Note',
      warning: {
        noNotes: 'No Notes',
      },
      error: {
        noteRequired: 'Note is required.',
        unableToAdd: 'Unable to add new note.',
      },
      addNoteAbove: 'Add a note using the button above.',
    },
    labs: {
      label: 'Labs',
      new: 'Add New Lab',
      warning: {
        noLabs: 'No Labs',
      },
      noLabsMessage: 'No labs requests for this person.',
    },
    medications: {
      label: 'Medications',
      new: 'Add New Medication',
      warning: {
        noMedications: 'No Medications',
      },
      noMedicationsMessage: 'No medications requests for this person.',
    },
    careGoal: {
      new: 'Add Care Goal',
      label: 'Care Goals',
      title: 'Title',
      description: 'Description',
      status: 'Status',
      achievementStatus: 'Achievement Status',
      priority: {
        label: 'Priority',
        low: 'low',
        medium: 'medium',
        high: 'high',
      },
      startDate: 'Start Date',
      dueDate: 'Due Date',
      note: 'Note',
      error: {
        unableToAdd: 'Unable to add a new care goal.',
        descriptionRequired: 'Description is required.',
        priorityRequired: 'Priority is required.',
        statusRequired: 'Status is required.',
        achievementStatusRequired: 'Achievement Status is required.',
        startDate: 'Start date is required.',
        dueDate: 'Due date is required.',
        dueDateMustBeAfterStartDate: 'Due date must be after start date',
      },
    },
    careGoals: {
      warning: {
        noCareGoals: 'No Care Goals',
        addCareGoalAbove: 'Add a care goal using the button above.',
      },
    },
    carePlan: {
      new: 'Add Care Plan',
      label: 'Care Plans',
      title: 'Title',
      description: 'Description',
      status: 'Status',
      condition: 'Condition',
      intent: 'Intent',
      startDate: 'Start Date',
      endDate: 'End Date',
      note: 'Note',
      error: {
        unableToAdd: 'Unable to add a new care plan.',
        titleRequired: 'Title is required.',
        descriptionRequired: 'Description is required.',
        conditionRequired: 'Condition is required.',
        statusRequired: 'Status is required.',
        intentRequired: 'Intent is required.',
        startDate: 'Start date is required.',
        endDate: 'End date is required',
      },
    },
    carePlans: {
      warning: {
        noCarePlans: 'No Care Plans',
        addCarePlanAbove: 'Add a care plan using the button above.',
      },
    },
    visit: 'Visit',
    visits: {
      new: 'Add Visit',
      label: 'Visits',
      startDateTime: 'Start Date',
      endDateTime: 'End Date',
      type: 'Type',
      status: 'Status',
      reason: 'Reason',
      location: 'Location',
      error: {
        unableToAdd: 'Unable to add a new visit.',
        startDateRequired: 'Start date is required.',
        endDateRequired: 'End date is required',
        endDateMustBeAfterStartDate: 'End date must be after start date',
        typeRequired: 'Type is required.',
        statusRequired: 'Status is required.',
        reasonRequired: 'Reason is required.',
        locationRequired: 'Location is required.',
      },
      warning: {
        noVisits: 'No Visits',
        addVisitAbove: 'Add a visit using the button above.',
      },
    },
    types: {
      charity: 'Charity',
      private: 'Private',
    },
    errors: {
      createPatientError: 'Could not create new patient.',
      updatePatientError: 'Could not update patient.',
      patientGivenNameFeedback: 'Given Name is required.',
      patientDateOfBirthFeedback: 'Date of Birth can not be greater than today',
      patientNumInSuffixFeedback: 'Cannot contain numbers.',
      patientNumInPrefixFeedback: 'Cannot contain numbers.',
      patientNumInFamilyNameFeedback: 'Cannot contain numbers.',
      patientNumInPreferredLanguageFeedback: 'Cannot contain numbers.',
      invalidEmail: 'Must be a valid email.',
      invalidPhoneNumber: 'Must be a valid phone number.',
    },
  },
}
