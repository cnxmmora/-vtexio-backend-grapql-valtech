import type { ServiceContext } from '@vtex/api'
import { json } from 'co-body'

import type { Clients } from '../clients'

export async function deleteMasterData(
  ctx: ServiceContext<Clients>,
  next: () => Promise<any>
) {
  const {
    clients: { masterData },
  } = ctx

   const body = await json(ctx.req)
const { entity, id } = body
  try {
    await masterData.delete(entity,id)
    ctx.status = 200
    ctx.body = { message: 'Document deleted' }
  } catch (err) {
    ctx.status = 500
    ctx.body = { error: 'Error deleting backup', details: err }
  }

  await next()
}
