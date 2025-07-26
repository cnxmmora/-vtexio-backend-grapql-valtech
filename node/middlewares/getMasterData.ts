import type { ServiceContext } from '@vtex/api'
import { json } from 'co-body'
import type { Clients } from '../clients'

export async function getMasterData(
  ctx: ServiceContext<Clients>,
  next: () => Promise<any>
) {
  const {
    clients: { masterData },
  } = ctx

  const body = await json(ctx.req)
  const { entity, id, fields } = body

  console.log('📩 Body recibido:', body)

  try {
    const data = await masterData.getDocumentById(entity, id, fields)

    console.log('✅ Documento recuperado:', data)

    if (!data) {
      ctx.status = 404
      ctx.body = { error: 'Documento no encontrado' }
    } else {
      ctx.status = 200
      ctx.body = data
    }
  } catch (err) {
    console.error('❌ Error al obtener documento:', err)
    ctx.status = 500
    ctx.body = { error: 'Error fetching active menu', details: err }
  }

  await next()
}

