const uuid = require('uuid/v4');
const CHAT_CHANNEL = 'CHAT_CHANNEL';

// Mock DB
let chats = [
	{ 
		id: uuid(), 
		from: 'Sachin',
		content: "Hello. How are you today?",
		createdAt: new Date('May 13, 2019 10:53:30').toString()
	},
	{ 
		id: uuid(),
		from: 'Mark',
		content: "Hey! I'm fine. Thanks for asking!",
		createdAt: new Date('May 13, 2019 10:54:00').toString()
	},
	{ 
		id: uuid(), 
		from: 'Sachin',
		content: "Sweet! So, what do you wanna do today?",
		createdAt: new Date('May 13, 2019 10:54:20').toString()
	},
	{ 
		id: uuid(),
		from: 'Mark',
		content: "Nah, I dunno. Play soccer.. or learn more coding perhaps?",
		createdAt: new Date('May 13, 2019 10:54:50').toString()
	},
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
				return context.pubsub.asyncIterator(CHAT_CHANNEL)
			}
		}
	}
}