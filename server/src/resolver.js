const uuid = require('uuid/v4');
const CHAT_CHANNEL = 'CHAT_CHANNEL';

let chats = [
	{ 
		id: uuid(), 
		from: 'Sachin', 
		content: "Hi, Mark! I made a new design for Messenger app", 
		createdAt: new Date('May 13, 2019 10:53:30').toString() 
	},
	{ 
		id: uuid(), 
		from: 'Mark', 
		content: "Yo! Send it to my assistant and we'll review it during the year", 
		createdAt: new Date('May 13, 2019 10:53:30').toString() 
	}
];


module.exports = {
	Query: {
		chats: (root, args, context) => chats,
		chat: (root, { from }, context) => chats.filter(chat => chat.from === from)
	},

	Mutation: {
		newChat: (root, { content, from }, { pubsub }) => {
			const id = uuid();
			const chat = {
				id,
				content,
				from,
				createdAt: new Date().toString(),
			};

			chats = [...chats, chat];
			pubsub.publish(CHAT_CHANNEL, { newMessage: chat });

			return chat;
		}
	},

	Subscription: {
		newMessage: {
			subscribe: (root, args, context) => {
				return context.pubsub.syncIterator(CHAT_CHANNEL)
			}
		}
	}
}