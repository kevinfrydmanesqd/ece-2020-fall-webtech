
const {v4: uuid} = require('uuid')
const {clone, merge} = require('mixme')

const store =  {
  channels: {
    // '1': {
    //   name: 'channel 1'
    // },
    // '2': {
    //   name: 'channel 2'
    // },
    // '3': {
    //   name: 'channel 3'
    // },
  }
}

module.exports = {
  channels: {
    create: (channel) => {
      if(!channel.name) throw Error('Invalid channel')
      id = uuid()
      store.channels[id] = channel
      return merge(channel, {id: id})
    },
    list: () => {
      return Object.keys(store.channels).map( (id) => {
        const channel = clone(store.channels[id])
        channel.id = id
        return channel
      })
    },
    update: (id, channel) => {
      const original = store.channels[id]
      if(!original) throw Error('Unregistered channel id')
      store.channels[id] = merge(original, channel)
    },
    update: (id, channel) => {
      const original = store.channels[id]
      if(!original) throw Error('Unregistered channel id')
      delete store.channels[id]
    }
  },
  admin: {
    reset: () => {
      store.channels = {}
    }
  }
}
