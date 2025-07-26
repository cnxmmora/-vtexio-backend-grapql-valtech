import type { ServiceContext } from '@vtex/api'
import { json } from 'co-body'

import type { Clients } from '../clients'

export async function updateMasterData(
  ctx: ServiceContext<Clients>,
  next: () => Promise<any>
) {
  const {
    clients: { masterData },
  } = ctx

  const body = await json(ctx.req)
   const { entity, id, fields } = body

  try {
    await masterData.updateDocument(entity, id, fields)
    ctx.status = 200
    ctx.body = { message: 'Backup updated' }
  } catch (err) {
    ctx.status = 500
    ctx.body = { error: 'Error updating backup', details: err }
  }

  await next()
}
