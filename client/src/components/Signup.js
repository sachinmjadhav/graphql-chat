import React, { useState } from 'react';
import './Signup.css';

const Signup = ({ signin }) => {
  const [username, setUsername] = useState('');

  const onSubmit = async e => {
    if(e.key === 'Enter') {
      signin(username);
    }
  }
  
  return (
    <div className="wrapper_in">
      <div className="label">
        <label>Login: </label>
      </div>

      <div className="form">
        <input
          autoFocus={true}
          className="input"
          type="text"
          placeholder="Enter your username"
          value={username}
          onKeyPress={onSubmit}
          onChange={e => setUsername(e.target.value)}
        />
        <button className="button" onClick={() => signin(username)}>
          Enter
        </button>
      </div>
    </div>
  )
}

export default React.memo(Signup);