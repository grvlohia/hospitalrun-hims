import AbstractDBModel from './AbstractDBModel'
import Name from './Name'

export default interface Staff extends AbstractDBModel, Name {
  loginName: string
  primaryEmail: string
  primaryMobile: string
}
