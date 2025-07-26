import type { ServiceContext } from '@vtex/api'
import { json } from 'co-body'

import type { Clients } from '../clients'

export async function createMasterData(
  ctx: ServiceContext<Clients>,
  next: () => Promise<any>
) {
  const {   
    clients: { masterData },
  } = ctx

  const body = await json(ctx.req)
const { name, fields } = body
  try {
    await masterData.create(name, fields)
    ctx.status = 200
    ctx.body = { message: 'Field create' }
  } catch (err) {
    ctx.status = 500
    ctx.body = { error: 'Error creating field', details: err }
  }

  await next()
}

