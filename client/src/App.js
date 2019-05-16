import React, { useState, useEffect, useRef } from 'react';
import { compose, graphql } from "react-apollo";
import { gql } from "apollo-boost";
import Signup from './components/Signup';
import Chat from './components/Chat';
import './App.css';

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
  const scrollRef = useRef();

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
          ...chatsQuery,
          chats: [
            ...prevData.chats,
            subscriptionData.data.newMessage
          ]
        };
      }
    })
  }

  const scrollToBottom = () => {
    if(scrollRef.current) {
      const messageList = scrollRef.current;
      const scrollHeight = messageList.scrollHeight;
      const height = messageList.clientHeight;
      const maxScrollTop = scrollHeight - height;
      messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  }

  useEffect(() => {
    scrollToBottom();
  }, [scrollRef.current && scrollRef.current.scrollHeight])

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
      <div className="wrapper">
        <div className="signupWrapper">
          <Signup signin={from => setFrom(from)} />
        </div>
      </div>
    )
  }

  return (
    <div className="wrapper">
      <div className="chatWrapper">
        <div className="chatInputWrapper">
          <h2 className="chatTitle">
            <span>Chat</span>
            <span className="username">
              Signed in as <span className="signinName">{from}</span>
            </span>
            <span className="logout" onClick={() => setFrom('')} title="logout">
              Logout
            </span>
          </h2>
        </div>
        <div className="chatbox" ref={scrollRef}>
        {chatsQuery.chats && 
          chatsQuery.chats.map(chat => (
            <Chat
              key={chat.id}
              chat={chat}
              currentUser={chat.from === from}
            />
          ))}
        </div>
          <div className="chatInputWrapper">
            <input
              className="chatInput"
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
