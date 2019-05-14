module.exports = `
  type Chat {
    id: ID!
    content: String!
    from: String!
    createdAt: String!
  }

  type Query {
    chats: [Chat]
    chat(from: String!): [Chat]
  }

  type Mutation {
    newChat(content: String!, from: String!): Chat
  }

  type Subscription {
    messageSent: Chat
  }
`