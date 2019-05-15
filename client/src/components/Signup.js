import React, { useState } from 'react';

const style = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5
  },
  label: {
    fontSize: 24,
    fontWeight: 'bolder',
    padding: 10,
    margin: '0 0 5px 0'
  },
  input: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #ddd',
    padding: 7,
    margin: 0,
    height: 30,
    borderRadius: 10,
    outline: 'none',
    fontSize: 16,
    width: 200
  },
  button: {
    backgroundColor: '#6fb0dc',
    fontSize: 16,
    outline: 'none',
    border: '1px solid #ddd',
    padding: 17,
    margin: '0 0 0 5px',
    borderRadius: 10,
    color: '#fff'
  }
};

const Signup = ({ signin }) => {
  const [username, setUsername] = useState('');

  const onSubmit = async e => {
    if(e.key === 'Enter') {
      signin(username);
    }
  }
  
  return (
    <div style={style.wrapper}>
      <div style={style.label}>
        <label>Login: </label>
      </div>

      <div>
        <input 
          style={style.input}
          type="text"
          placeholder="Enter your username"
          value={username}
          onKeyPress={onSubmit}
          onChange={e => setUsername(e.target.value)}
        />
        <button style={style.button} onClick={() => signin(username)}>
          Enter
        </button>
      </div>
    </div>
  )
}

export default Signup;