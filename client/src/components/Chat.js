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
  },
  time: {
    padding: 3,
    color: '#aaa',
    float: 'right'
  },
  content: {
    padding: 5,
    margin: 5
  }
}

const Chat = (props) => {
  return (
    <div style={style.wrapper}>
      <div style={props.currentUser ? {...style.message, backgroundColor: 'rgb(230, 230, 230)'} : style.message}>
      {/* <span style={style.time}>{new Date(props.chat.createdAt * 1000).getHours()} : {new Date(props.chat.createdAt * 1000).getMinutes()}</span> */}
        <h5
          style={
            !props.currentUser ? {...style.author, color: "#5887a7"} : style.author
          }
        >
          {props.chat.from}
        </h5>
        <p style={style.content}>{props.chat.content}</p>
      </div>
    </div>
  )
}

export default React.memo(Chat);