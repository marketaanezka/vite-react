import { useState } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState("")
  const [greet, setGreet] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { setName(e.target.value) }

  const handleGreet = () => { setGreet(true) }

  return (
    <>
      {greet ? <h1>Hi, {name}!</h1> : <h1>Hello, who's there?</h1>}
      <div className="card">
        <input type="text" name="person" id="" value={name} onChange={handleChange} />
      </div>
      <div>
        <button onClick={handleGreet}>Say hi</button>
      </div>
    </>
  )
}

export default App
