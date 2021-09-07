import {Model} from '@orion-js/app'

export default model =>
  new Model({
    name: `Paginated${model.name}`,
    schema: {
      nextToken: {
        type: String
      },
      items: {
        type: [model]
      }
    }
  })
