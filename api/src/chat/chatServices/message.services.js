const Message = require('../chatModels/message.models')

const createMessage = async (obj) => {
  const data = await Message.create({
    user: obj.userId, 
    conversation: obj.conversationId, 
    message: obj.message
  })
  return data 
}

module.exports = {
  createMessage
}