import type { InstanceOptions, IOContext } from '@vtex/api'
import { MasterData as VTEXMasterData } from '@vtex/api'

export class MasterData extends VTEXMasterData {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
      retries: 3,
    })
  }
  public updateDocument(
    entity: string,
    id: string,
    fields: Record<string, any>
  ): Promise<any> {
    return this.updatePartialDocument({ dataEntity: entity, id, fields })
  }


  public delete(name: string, id: any
  ): Promise<any> {
    return this.deleteDocument({
      dataEntity: name,
      id: id
    })
  }

  public create(name: string, fields: any
  ): Promise<any> {
    return this.createDocument({
      dataEntity: name,
      fields
    })
  }
   public getDocumentById(
    entity: string,
    id: string,
    fields: string[]
  ): Promise<any> {
    return this.getDocument({ dataEntity: entity, id, fields })
  }
  

  public search(name: string, fields: string[]): Promise<any[]> {
    return this.searchDocuments({
      dataEntity: name,
      fields,
      pagination: { page: 1, pageSize: 25 }
    })
  }
}
