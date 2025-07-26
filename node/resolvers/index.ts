
export const resolvers = {
  Query: {
    getCookieData: async (_: any, __: any, ctx: Context) => {
      const {
        clients: { masterdata },
      } = ctx

      try {
        const documents = await masterdata.searchDocuments({
          dataEntity: 'CF',
          fields: ['id', 'CookieFortune'],
          pagination: {
            page: 1,
            pageSize: 100,
          },
        })
        return documents
      } catch (err) {
        console.error('Error fetching cookie data:', err)
        throw new Error('Failed to fetch cookie data')
      }
    },


    getRandomCookieData: async (_: any, __: any, ctx: Context) => {
      const {
        clients: { masterdata },
      } = ctx
      try {

        const documents = await masterdata.searchDocuments({
          dataEntity: 'CF',
          fields: ['id', 'CookieFortune'],
          pagination: {
            page: 1,
            pageSize: 100,
          },
        })
        if (!documents || documents.length === 0) return null
        if (documents.length === 1) return documents[0]

        const randomIndex = Math.floor(Math.random() * documents.length)

        return documents[randomIndex]
      } catch (err) {
        console.error('Error fetching cookie data:', err)
        throw new Error('Failed to fetch cookie data')
      }
    },

    searchCookieData: async (_: any, args: any, ctx: Context) => {
      const {
        clients: { masterdata },
      } = ctx

      const { CookieFortune } = args


      try {

        const [document] = await masterdata.searchDocuments({
          dataEntity: 'CF',
          fields: ['id', 'CookieFortune'],
          where: `CookieFortune="${CookieFortune}"`,
          pagination: {
            page: 1,
            pageSize: 1,
          },
        })

        return document || null

      } catch (err) {
        console.error('Error fetching cookie data:', err)
        throw new Error('Failed to fetch cookie data')
      }
    },
  },

  Mutation: {
    createCookieData: async (_: any, args: any, ctx: Context) => {
      const {
        clients: { masterdata },
      } = ctx

      const { CookieFortune } = args

      await masterdata.createDocument({
        dataEntity: 'CF',
        fields: {
          CookieFortune,
        },
      })

      return { CookieFortune }
    },

    updateCookieData: async (_: any, args: any, ctx: Context) => {
      const {
        clients: { masterdata },
      } = ctx

      const { id, CookieFortune } = args

      await masterdata.updatePartialDocument({
        dataEntity: 'CF',
        id,
        fields: {
          CookieFortune,
        },
      })

      return { CookieFortune }
    },

    deleteCookieData: async (_: any, args: any, ctx: Context) => {
      const {
        clients: { masterdata },
      } = ctx

      const { id } = args

      const document = await masterdata.getDocument({
        dataEntity: 'CF',
        id,
        fields: ['CookieFortune'],
      })

      await masterdata.deleteDocument({
        dataEntity: 'CF',
        id,
      })

      return document
    },
  },
}


/*QUERYS
query{
  searchCookieData(CookieFortune:"Quédate con tu esposa"){
    id
    CookieFortune
  }
}


mutation{
  updateCookieData(id: "18f9cb9c-68e2-11f0-b37f-91ac8442ba17",
        CookieFortune: "NuevoCampo de Mensajes"){
    id
    CookieFortune    
  }
}


mutation{
  deleteCookieData(id:"18f9cb9c-68e2-11f0-b37f-91ac8442ba17"){
    id
    CookieFortune
  }
}

mutation{
  createCookieData(CookieFortune:"NuevoCampo"){
    CookieFortune
    id
  }
}

query{
  getCookieData{
    id
    CookieFortune
  }
}


*/