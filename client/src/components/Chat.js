import React from 'react';
import './Chat.css'

const style = {
  wrapper: {
    padding: 5,
    width: '90%',
  }
}

const Chat = (props) => {
  return (
    <div style={style.wrapper}>
      <div className="message" style={props.currentUser ? { backgroundColor: 'rgb(230, 230, 230)' } : { backgroundColor: '#f2f2f2' }}>
        <h5
          className="author"
          style={
            !props.currentUser ? { color: "#5887a7" } : { color: "black" }
          }
        >
          {props.chat.from}
        </h5>
        <p className="content">{props.chat.content}</p>
      </div>
    </div>
  )
}

export default React.memo(Chat);