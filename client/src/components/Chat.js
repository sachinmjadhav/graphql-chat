import React from 'react';

const style = {
  wrapper: {
    padding: 5,
    display: 'grid',
    width: '90%',
    gridTemplateColumns: 'auto auto',
  },
  author: {
    fontSize: 16,
    fontWeight: 'bolder',
    padding: 5,
    margin: '5px 0 0 5px'
  },
  message: {
    fontSize: 14,
    padding: 5,
    borderRadius: 5,
    margin: '5px 0 0 5px',
    backgroundColor: '#f2f2f2'
  }
}

const Chat = (props) => {
  return (
    <div style={style.wrapper}>
      <div style={props.currentUser ? {...style.message, float: 'right'} : style.message}>
        <h5
          style={
            props.currentUser ? {...style.author, color: "#5887a7"} : style.author
          }
        >
          {props.chat.from}
        </h5>
        <p style={style.message}>{props.chat.content}</p>
      </div>
    </div>
  )
}

export default Chat;