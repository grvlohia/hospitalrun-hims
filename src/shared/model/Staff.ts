import AbstractDBModel from './AbstractDBModel'
import Name from './Name'

export default interface Staff extends AbstractDBModel, Name {
  metadata: {
    docType: string
  }
  loginName: string
  primaryEmail: string
  primaryMobile: string
  code: string
  roles: string[]
}
