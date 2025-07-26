import { IOClients } from '@vtex/api'
import { MasterData } from './masterData'

export class Clients extends IOClients {
  public get masterData() {
    return this.getOrSet('masterData', MasterData)
  }
}
