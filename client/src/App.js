import React, { useState, useEffect } from 'react';
import { compose, graphql } from "react-apollo";
import { gql } from "apollo-boost";
import Signup from './components/Signup';
import Chat from './components/Chat';

const style = {
  wrapper: {
    backgroundColor: '#fff',
    display: 'block',
    margin: 'auto',
    marginTop: '10%',
    padding: '0 15',
    width: '50%',
    maxWidth: '500px',
    maxHeight: '600px',
  },
  signupWrapper: {
    padding: 50
  },
  chatWrapper: {
    padding: 10
  },
  chatTitleWrapper: {
    backgroundColor: '#6fb0dc',
    borderBottom: '1px solid #5887a7',
    padding: '20px 10px'
  },
  chatTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
    margin: 0,
    padding: 10,
    width: '100%'
  },
  logout: {
    color: '#5887a7',
    cursor: 'pointer',
    marginRight: 15,
    fontSize: 16,
    fontWeight: 'normal',
    textAlign: 'right'
  },
  username: {
    fontSize: 16,
    marginRight: 5,
  },
  signinName:{
    color: '#5887a7'
  },
  chatbox: {
    maxHeight: '500px',
    overflowY: 'scroll'
  },
  chatInputWrapper: {
    backgroundColor: '#FFFFFF',
    overflow: 'hidden'
  },
  chatInput: {
    border: 'none',
    borderTop: '0 solid #333',
    borderTopWidth: 1,
    borderRadius: 0,
    padding: 10,
    margin: 0,
    marginTop: 5,
    width: '100%',
    fontSize: 16
  }
};


const CHATS_QUERY = gql`
  query chats {
    chats {
      id
      content
      from
      createdAt
    }
  }
`;

const NEW_CHAT_MUTATION = gql`
  mutation NewChatMutation($content: String!, $from: String!) {
    newChat(content: $content, from: $from) {
      id
      content
      from
      createdAt
    }
  }
`;

const App = ({ chatsQuery, createChatMutation }) => {
  const [from, setFrom] = useState('Sachin');
  const [content, setContent] = useState('');
  const [chatList, setChatList] = useState([]);

  const subscribeToNewChats = () => {
    chatsQuery.subscribeToMore({
      document: gql`
        subscription MessageSentSubscription {
          newMessage {
            id
            content
            from
            createdAt
          }
        }
      `,
      updateQuery: (prevData, { subscriptionData }) => {
        return {
          chats: [
            subscriptionData.data.messageSent,
            ...prevData.chats
          ]
        };
      }
    })
  }

  useEffect(() => {
    if(chatsQuery.chats) {
      setChatList(chatsQuery.chats);
    }
  }, [chatsQuery.chats && chatsQuery.chats.length])

  useEffect(() => {
    subscribeToNewChats();
  }, [])

  const createChat = async e => {
    if(e.key === "Enter") {
      await createChatMutation({
        variables: { content, from }
      });
      setContent('');
    }
  }

  if(!from || from.length === 0) {
    return (
      <div style={style.wrapper}>
        <div style={style.signupWrapper}>
          <Signup signin={from => setFrom(from)} />
        </div>
      </div>
    )
  }

  return (
    <div style={style.wrapper}>
      <div style={style.chatWrapper}>
        <div style={style.chatInputWrapper}>
          <h2 style={style.chatTitle}>
            <span>Chat</span>
            <span style={style.username}>
              Signed in as <span style={style.signinName}>{from}</span>
            </span>
            <span style={style.logout} onClick={() => setFrom('')} title="logout">
              Logout
            </span>
          </h2>
        </div>
        <div style={style.chatbox}>
        {chatList.length > 0 && 
          chatList.map(chat => {
            return (
            <Chat
              key={chat.id}
              chat={chat}
              currentUser={chat.from === from}
            />
          )})}
        </div>
          <div style={style.chatInputWrapper}>
            <input 
              style={style.chatInput}
              type="text"
              placeholder="Start Typing..."
              value={content}
              onKeyPress={createChat}
              onChange={e => setContent(e.target.value)}
            />
          </div>
      </div>
    </div>
  );
}

export default compose(
  graphql(CHATS_QUERY, { name: 'chatsQuery' }),
  graphql(NEW_CHAT_MUTATION, { name: 'createChatMutation' })
)(App);
