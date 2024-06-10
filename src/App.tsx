import React, { useState } from 'react';
import './styles/App.css';

function App() {
  const [name, setName] = useState("");
  const [greet, setGreet] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleGreet = () => {
    setGreet(true);
  };

  return (
    <div>
      <a href="/login">Login</a>
      <div>
        {greet ? <h1>Hi, {name}!</h1> : <h1>Hi, who's there?</h1>}
        <div className="card">
          <input
            type="text"
            name="person"
            id=""
            value={name}
            onChange={handleChange}
          />
        </div>
        <div>
          <button onClick={handleGreet}>Say hi</button>
        </div>
      </div>
    </div>
  );
}

export default App;
